import db from "./models"
import { Request, Response } from "express";

const Statistic = db.statistic;

export const createStat = (req: Request, res: Response) => {
  // Create a Example
  const stat = new Statistic({
    attemptsToday: 0,
    guessesToday: 0,
    totalAttempts: 0
  });

  // Save Example in the database
  stat.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
    });
}

export const getStat = (res: Response) => {
  Statistic.findOne({_id: 0})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
    });
}

export const updateStat = (req: Request, res: Response) => {
  if (!req.body) {
    return res.send({
      message: "Update data required"
    });
  }

  const id = 0;

  Statistic.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (data) {
        res.send({ message: "Updated" });
      }
    })
    .catch(err => {
      console.log(err)
    });
}