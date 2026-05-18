import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";
import { demoPassword, skillTags, users } from "./seedData.js";

const hashSeedPassword = async () => bcrypt.hash(demoPassword, 10);

const upsertUsers = async (passwordHash) => {
  const seededUsersByEmail = new Map();

  for (const user of users) {
    const seededUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        passwordHash
      },
      create: {
        email: user.email,
        passwordHash,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });

    seededUsersByEmail.set(user.email, seededUser);
  }

  return seededUsersByEmail;
};

const upsertProfiles = async (seededUsersByEmail) => {
  const seededProfilesByEmail = new Map();

  for (const user of users) {
    const seededUser = seededUsersByEmail.get(user.email);

    const profile = await prisma.profile.upsert({
      where: { userId: seededUser.id },
      update: {
        headline: user.headline,
        bio: user.bio,
        location: user.location,
        hourlyRateCents: user.hourlyRateCents,
        avatarUrl: user.avatarUrl,
        availability: user.availability
      },
      create: {
        userId: seededUser.id,
        headline: user.headline,
        bio: user.bio,
        location: user.location,
        hourlyRateCents: user.hourlyRateCents,
        avatarUrl: user.avatarUrl,
        availability: user.availability
      }
    });

    seededProfilesByEmail.set(user.email, profile);
  }

  return seededProfilesByEmail;
};

const upsertSkillTags = async () => {
  const seededSkillTagsByName = new Map();

  for (const name of skillTags) {
    const skillTag = await prisma.skillTag.upsert({
      where: { name },
      update: {},
      create: { name }
    });

    seededSkillTagsByName.set(skillTag.name, skillTag);
  }

  return seededSkillTagsByName;
};

const connectProfilesToSkillTags = async (seededProfilesByEmail, seededSkillTagsByName) => {
  let connectionCount = 0;

  for (const user of users) {
    const profile = seededProfilesByEmail.get(user.email);

    await prisma.profileSkillTag.deleteMany({
      where: { profileId: profile.id }
    });

    for (const skillTagName of user.skillTags) {
      const skillTag = seededSkillTagsByName.get(skillTagName);

      if (!skillTag) {
        throw new Error(`Missing seed skill tag: ${skillTagName}`);
      }

      await prisma.profileSkillTag.create({
        data: {
          profileId: profile.id,
          skillTagId: skillTag.id
        }
      });

      connectionCount += 1;
    }
  }

  return connectionCount;
};

const main = async () => {
  const passwordHash = await hashSeedPassword();
  const seededUsersByEmail = await upsertUsers(passwordHash);
  const seededProfilesByEmail = await upsertProfiles(seededUsersByEmail);
  const seededSkillTagsByName = await upsertSkillTags();
  const profileSkillTagConnections = await connectProfilesToSkillTags(
    seededProfilesByEmail,
    seededSkillTagsByName
  );

  console.log(`Seeded ${seededUsersByEmail.size} demo users.`);
  console.log(`Seeded ${seededProfilesByEmail.size} demo profiles.`);
  console.log(`Seeded ${seededSkillTagsByName.size} skill tags.`);
  console.log(`Connected ${profileSkillTagConnections} profile skill tags.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
