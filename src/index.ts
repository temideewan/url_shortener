import "dotenv/config";
import  { onDatabaseConnect } from "./config/knex";

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log("database connected");
  } catch (error) {  
      console.log(error);
  }
};

main();
