import express from "express";
const app = express();
const PORT = 8000;
import helmet from "helmet";
import cors from "cors";

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// db connect
import { dbConnect } from "./src/config/dbconfig.js";
dbConnect();

import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/task", taskRouter);

app.use("/", (req, res) => {
  res.json({
    status: "success", // either success or error
    messsage: "you have reached not to do api",
  });
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
