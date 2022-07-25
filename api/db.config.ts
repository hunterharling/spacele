import * as dotenv from "dotenv";
console.log(dotenv);
const dbConfig = {
  url: process.env.DB_URL
}

export default dbConfig;