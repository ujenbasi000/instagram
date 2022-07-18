import auth from "../middleware/auth.js";
import { UserModel as User, PostModel as Post } from "../models/index.js";

const resolvers = {
  getGreetings: () => "Hello world!",

  getAuthorizedUser: async (_, __, ctx) => {
    const { id } = await auth(ctx);
    if (!id)
      return {
        sucess: false,
        message: "User not found",
        data: null,
      };

    const user = await User.findById(id);

    if (!user)
      return {
        sucess: false,
        message: "User not found",
        data: null,
      };

    return {
      sucess: true,
      message: "User found",
      data: user,
    };
  },

  getSearchedUser: async (_, { input }, ctx) => {
    const { id } = await auth(ctx);

    if (!id)
      return {
        sucess: false,
        message: "User not found",
        data: null,
      };

    if (input.search.trim().length === 0) {
      return {
        sucess: true,
        message: "No results found",
        data: [],
      };
    }

    const users = await User.find({
      username: {
        $regex: input.search,
        $options: "i",
      },
    }).select("username profile _id name");

    if (!users)
      return {
        sucess: false,
        message: "User not found",
        data: null,
      };

    return {
      sucess: true,
      message: "User found",
      data: users,
    };
  },

  getUserDetailsByUsername: async (_, { input }, ctx) => {
    try {
      const { id } = await auth(ctx);

      if (!id)
        return {
          sucess: false,
          message: "User not found",
          data: null,
          posts: null,
        };

      const user = await User.findOne({ username: input.username.trim() });

      if (!user) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
          posts: null,
        };
      }

      const posts = await Post.find({
        user,
      })
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
        message: "User and posts found",
        user,
        posts,
      };
    } catch (err) {
      return {
        sucess: true,
        message: err.message,
        user: null,
        posts: null,
      };
    }
  },
};

export default resolvers;
