import auth from "../middleware/auth.js";
import { PostModel as Post, SaveModel as Save } from "../models/index.js";

const PostQuery = {
  getPosts: async (_, { input }, ctx) => {
    try {
      const { id } = await auth(ctx);
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }
      const { limit, skip } = input;

      const posts = await Post.find()
        .limit(limit)
        .skip(skip)
        .populate({
          path: "user",
          model: "User",
        })
        .populate({
          path: "comments",
          populate: {
            path: "user",
            model: "User",
          },
        });

      return {
        sucess: true,
        message: "Posts found",
        data: posts,
      };
    } catch (error) {
      return {
        sucess: false,
        message: error.message,
        data: null,
      };
    }
  },

  getSinglePost: async (_, { input }, ctx) => {
    try {
      const { id: userId } = await auth(ctx);
      if (!userId) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }

      const { id } = input;

      const post = await Post.findById(id)
        .populate("user")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            model: "User",
          },
        });

      return {
        sucess: true,
        message: "Post found",
        data: [post],
      };
    } catch (error) {
      return {
        sucess: false,
        message: error.message,
        data: null,
      };
    }
  },

  getSavedPosts: async (_, __, ctx) => {
    try {
      const { id } = await auth(ctx);
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }

      const posts = await Save.find({ user: id }).populate("user");

      return {
        sucess: true,
        message: "Posts found",
        data: posts,
      };
    } catch (error) {
      return {
        sucess: false,
        message: "Posts not found",
        data: null,
      };
    }
  },

  getUserPost: async (_, __, ctx) => {
    try {
      const { id } = await auth(ctx);
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }
      const posts = await Post.find({ user: id }).populate("user");

      return {
        sucess: true,
        message: "Posts found",
        data: posts,
      };
    } catch (error) {
      return {
        sucess: false,
        message: "Posts not found",
        data: null,
      };
    }
  },
};

export default PostQuery;
