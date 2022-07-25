import { getStat, updateStat, createStat } from "./views";
import * as express from "express";

let router = express.Router();

const routes = (app: express.Express) => {
  // create model
  // router.post("/", createStat);

  // find every
  router.get("/", getStat);

  // update fields
  router.put("/update/:id", updateStat);

  app.use("/api/stats", router);
}

export default routes;