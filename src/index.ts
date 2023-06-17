import "dotenv/config"
import { onDatabaseConnect } from "./config/knex";
onDatabaseConnect()
  .then(() => console.log("Database is connected"))
  .catch((e) => {
    console.log("error occurred");
    console.log(e);
  });
