import mongoose from "mongoose";
const { Schema, model } = mongoose;
const PostSchema = new Schema(
  {
    collection: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = model.Post || model("Post", PostSchema);
export default Post;
