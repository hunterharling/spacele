import * as mongoose from "mongoose";

interface Stats {
  attemptsToday: number;
  guessesToday: number;
  totalAttempts: number;
}

let schema = new mongoose.Schema<Stats>({
  attemptsToday: { type: Number, required: true },
  guessesToday: { type: Number, required: true },
  totalAttempts: { type: Number, required: true },
});

const Statistic = mongoose.model<Stats>("Statistic", schema);

export default Statistic;