import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8000; // dynamic localhost or 8000
import helmet from "helmet";
import cors from "cors";
import path from "path";
// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// db connect
import { dbConnect } from "./src/config/dbconfig.js";
dbConnect();

import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/task", taskRouter);

// static content server
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.use((error, req, res, next) => {
  const status = error.status || 404;
  console.log(error);

  res.json({
    status: "error",
    messsage: error.message,
  });

  //writng in file system or database, or send warning text messege to devops team
});

app.listen(PORT, (error) => {
  error && console.log(error);

  console.log(`server running at http://localhost:${PORT}`);
});
