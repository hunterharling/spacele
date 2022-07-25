import { getStat, updateStat, createStat, resetStat } from "./views";
import * as express from "express";

let router = express.Router();

const routes = (app: express.Express) => {
  // create model
  // router.post("/", createStat);

  // find every
  router.get("/", getStat);

  // update fields
  router.put("/update/:id", updateStat);

  // reset dail
  router.put("/reset", resetStat);

  app.use("/api/stats", router);
}

export default routes;