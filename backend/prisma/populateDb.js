import "dotenv/config";

const main = async () => {
  console.log("SideQuest database seed script is ready.");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
