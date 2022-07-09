import mongoose from "mongoose";
const { models, model, Schema } = mongoose;

const SaveModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const Save = models.Save || model("Save", SaveModel);
export default Save;
