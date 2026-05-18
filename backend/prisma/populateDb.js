import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";
import { demoPassword, users } from "./seedData.js";

const hashSeedPassword = async () => bcrypt.hash(demoPassword, 10);

const upsertUsers = async (passwordHash) => {
  const seededUsers = [];

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

    seededUsers.push(seededUser);
  }

  return seededUsers;
};

const main = async () => {
  const passwordHash = await hashSeedPassword();
  const seededUsers = await upsertUsers(passwordHash);

  console.log(`Seeded ${seededUsers.length} demo users.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
