import "dotenv/config";
import knex, { onDatabaseConnect } from "./config/knex";
import Validator from "validatorjs";

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

main();
