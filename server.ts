import * as express from "express";
import routes from "./api/paths";
import db from "./api/models";
import * as path from "path";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import "dotenv/config";

// App
const app = express();
const HOST = 'localhost';
const { PORT="3000" } = process.env;

// CORS and bodyParser
const corsOptions = {
  origin: process.env.URL,
  methods: ['GET', 'PUT', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization']
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

db.mongoose
  .connect(process.env.DB_URL).then(() => {
    // Listen app if connected to db
    console.log("db connected");
    app.listen(PORT, () => {
      console.log('listening on http://' + HOST + ':' + PORT + '/');
    });
  }).catch(err => {
    console.log("cannot connect to db " + err);
  });

// Frontend
app.use(express.static(path.join(__dirname, '/build')));

// API
routes(app);

// Main
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});