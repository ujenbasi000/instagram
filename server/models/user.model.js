import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
      required: false,
      enum: ["male", "female"],
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
