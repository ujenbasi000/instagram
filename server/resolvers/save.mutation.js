import auth from "../middleware/auth.js";
import { SaveModel as Save } from "../models/index.js";

const SaveMutation = {
  savePost: async (_, { input }, ctx) => {
    const { id } = await auth(ctx);

    try {
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }
      let alreadySaved = false;
      const post = await Save.findOne({ user: id, post: input.post });

      if (post) {
        alreadySaved = true;
        await Save.findOneAndDelete({ user: id, post: input.post });
      } else {
        alreadySaved = false;
        await Save.create({
          ...input,
          user: id,
        });
      }

      return {
        sucess: true,
        message: alreadySaved ? "Post unsaved" : "Post saved",
      };
    } catch (error) {
      return {
        sucess: false,
        message: error.message,
      };
    }
  },
};
export default SaveMutation;
