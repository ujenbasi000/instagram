import { PostModel as Post } from "../models/index.js";
import auth from "../middleware/auth.js";

const PostMutation = {
  createPost: async (_, { input }, ctx) => {
    const { id } = await auth(ctx);

    try {
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }

      const post = await Post.create({
        ...input,
        user: id,
      });

      return {
        sucess: true,
        message: "Post created",
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

  likeDislikePost: async (_, { input }, ctx) => {
    try {
      const { id } = await auth(ctx);
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }

      const { post } = input;
      let alreadyLiked = false;

      const postToLike = await Post.findById(post);

      if (!postToLike) {
        return {
          sucess: false,
          message: "Post not found",
          data: null,
        };
      }

      if (postToLike.likes.users.includes(id)) {
        alreadyLiked = true;
        postToLike.likes.users.pull(id);
        postToLike.likes.total -= 1;
      } else {
        alreadyLiked = false;
        postToLike.likes.users.push(id);
        postToLike.likes.total += 1;
      }

      await postToLike.save();

      return {
        sucess: true,
        message: alreadyLiked ? "Post disliked" : "Post liked",
        data: [postToLike],
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

export default PostMutation;
