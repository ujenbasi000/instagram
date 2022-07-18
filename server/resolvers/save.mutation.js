import auth from "../middleware/auth.js";
import { SaveModel as Save, PostModel as Post } from "../models/index.js";

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
      const save = await Save.findOne({ user: id, post: input.post });
      const post = await Post.findById(input.post);

      if (!post) {
        return {
          success: false,
          message: "Post not found",
          data: null,
        };
      }

      if (save) {
        alreadySaved = true;
        post.saves.users.pull(id);
        await Save.findOneAndDelete({ user: id, post: input.post });
      } else {
        post.saves.users.push(id);
        alreadySaved = false;
        await Save.create({
          ...input,
          user: id,
        });
      }

      await post.save();

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
