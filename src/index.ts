import "dotenv/config"
import knex, { onDatabaseConnect } from "./config/knex";

const main = async () => {
  try {
    await onDatabaseConnect()
    console.log("database connected")
    await knex("urls").where("id", "62c60a").delete();
    const urls = await knex("urls")
    console.log(urls);
    
  } catch (error) {
    console.log(error);
  }
}

main();
