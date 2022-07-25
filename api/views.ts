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

export const getStat = (req: Request, res: Response) => {
  Statistic.findById("62ddfe275b5b39a190b76be5")
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

  Statistic.findByIdAndUpdate({_id: req.params.id}, {$inc: req.body})
    .then(data => {
      if (data) {
        res.send({ message: "Updated" });
      }
    })
    .catch(err => {
      console.log(err)
    });
}

export const resetStat = (req: Request, res: Response) => {
  if (!req.body) {
    return res.send({
      message: "Update data required"
    });
  }

  Statistic.findByIdAndUpdate({_id: "62ddfe275b5b39a190b76be5"}, req.body, {useFindAndModify: false})
    .then(data => {
      if (data) {
        res.send({ message: "Updated" });
      }
    })
    .catch(err => {
      console.log(err)
    });
}