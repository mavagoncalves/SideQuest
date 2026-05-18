import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";
import { demoPassword } from "./seedData.js";

const hashSeedPassword = async () => bcrypt.hash(demoPassword, 10);

const main = async () => {
  await hashSeedPassword();
  console.log("SideQuest database seed helpers are ready.");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
