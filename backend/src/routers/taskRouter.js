import express from "express";
import {
  deleteManyTaskById,
  deleteTaskById,
  getSingleTask,
  getTask,
  insertTask,
  updateTask,
} from "../model/task/TaskModule.js";
const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    //query the database and get all the task
    const { _id } = req.params;
    const result = _id ? getSingleTask(_id) : await getTask();

    res.json({
      status: "success", // either success or error
      messsage: "return form get method",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    // call db query to store data in the db
    const result = await insertTask(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success", // either success or error
          messsage: "The new task has been add",
          result,
        })
      : res.json({
          status: "error", // either success or error
          messsage: "You do not have added a task",
          result,
        });
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    //
    console.log(req.body);
    const { _id, type } = req.body;

    const result = await updateTask(_id, type);
    console.log(result);
    res.json({
      status: "success", // either success or error
      messsage: "return form patch method",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;

    const result = await deleteManyTaskById(ids);
    console.log(result);
    res.json({
      status: "success", // either success or error
      messsage: "return form delete method",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
