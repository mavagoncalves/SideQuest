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
  const seededProfiles = [];

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

    seededProfiles.push(profile);
  }

  return seededProfiles;
};

const upsertSkillTags = async () => {
  const seededSkillTags = [];

  for (const name of skillTags) {
    const skillTag = await prisma.skillTag.upsert({
      where: { name },
      update: {},
      create: { name }
    });

    seededSkillTags.push(skillTag);
  }

  return seededSkillTags;
};

const main = async () => {
  const passwordHash = await hashSeedPassword();
  const seededUsersByEmail = await upsertUsers(passwordHash);
  const seededProfiles = await upsertProfiles(seededUsersByEmail);
  const seededSkillTags = await upsertSkillTags();

  console.log(`Seeded ${seededUsersByEmail.size} demo users.`);
  console.log(`Seeded ${seededProfiles.length} demo profiles.`);
  console.log(`Seeded ${seededSkillTags.length} skill tags.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
