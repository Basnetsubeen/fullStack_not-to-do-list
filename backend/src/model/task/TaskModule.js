import TaskSchema from "./TaskSchema.js";

//insert
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};

//select

export const getTask = () => {
  //single task
  return TaskSchema.find();
};
export const getSingleTask = (_id) => {
  // multiple task
  return TaskSchema.findById(_id);
};

//update

export const updateTask = (_id, type) => {
  return TaskSchema.findByIdAndUpdate(_id, { type }, { new: true });
  // if we dont pass the new true it will show the old data and if we pass it will show the new data
};

//delete one task
export const deleteTaskById = (_id) => {
  return TaskSchema.findByIdAndDelete(_id);
};

//delete many task
export const deleteManyTaskById = (ids) => {
  return TaskSchema.deleteMany({
    _id: {
      $in: ids,
    },
  });
};
