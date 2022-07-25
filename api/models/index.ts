import * as mongoose from "mongoose";
import Statistic from "./stats.model";
import dbConfig from "../db.config";

export interface dbType {
  mongoose: mongoose.Mongoose;
  url: string;
  stats: typeof Statistic;
}

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  statistic: Statistic
};

export default db;