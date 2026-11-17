import "dotenv/config";
import { pool } from "./index";
import { ensureSeeded } from "./seed-data";

ensureSeeded()
  .then(async () => {
    console.log("Seed complete");
    await pool.end();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
