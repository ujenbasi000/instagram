import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err.message));
};

export default connection;
