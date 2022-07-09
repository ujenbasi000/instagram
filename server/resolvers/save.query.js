import auth from "../middleware/auth.js";
import { SaveModel as Save } from "../models/index.js";

const SaveQuery = {
  getSavedPosts: async (_, { input }, ctx) => {
    try {
      const { limit, skip } = input;
      const { id } = await auth(ctx);

      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }

      const posts = await Save.find({ user: id })
        .limit(limit)
        .skip(skip)
        .populate("user post");

      return {
        sucess: true,
        message: "Posts found",
        data: posts.map((post) => post.post),
      };
    } catch (error) {
      return {
        sucess: false,
        message: error.message,
        data: null,
      };
    }
  },
};

export default SaveQuery;
