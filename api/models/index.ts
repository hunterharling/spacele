import * as mongoose from "mongoose";
import Statistic from "./stats.model";

export interface dbType {
  mongoose: mongoose.Mongoose;
  stats: typeof Statistic;
}

const db = {
  mongoose: mongoose,
  statistic: Statistic
};

export default db;