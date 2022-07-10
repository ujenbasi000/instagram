import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const PostSchema = new Schema(
  {
    collections: [
      // image and video Collections
      {
        type: String,
        required: true,
      },
    ],
    caption: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      total: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
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

const Post = models.Post || model("Post", PostSchema);
export default Post;
