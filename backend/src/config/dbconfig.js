import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    //mongodb+srv://sbaAdmin:<Basnet>@cluster0.83cpm.mongodb.net/march_task_list?retryWrites=true&w=majority
    // const MONGO_CLIENT = "mongodb://localhost/march_task_list";
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
