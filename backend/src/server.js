import "dotenv/config";

import { app } from "./app.js";

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`SideQuest API listening on http://${host}:${port}`);
});
