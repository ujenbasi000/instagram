import { PostModel as Post, CommentModel as Comment } from "../models/index.js";
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

  commentPost: async (_, { input }, ctx) => {
    try {
      const { id } = await auth(ctx);
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
        };
      }

      const { post, comment } = input;

      if (!comment) {
        return {
          sucess: false,
          message: "Comment is required",
        };
      }

      let postToComment = await Post.findById(post);
      if (!postToComment) {
        return {
          sucess: false,
          message: "Post not found",
        };
      }

      const newComment = await Comment.create({
        content: comment,
        user: id,
        post,
      });

      postToComment.comments = [newComment._id].concat(postToComment.comments);

      await postToComment.save();

      return {
        sucess: true,
        message: "Comment created",
      };
    } catch (err) {
      return {
        sucess: false,
        message: err.message,
      };
    }
  },

  likeDislikeComment: async (_, { input }, ctx) => {
    try {
      const { id } = await auth(ctx);
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
        };
      }

      const { comment } = input;

      let commentToLike = await Comment.findById(comment);
      if (!commentToLike) {
        return {
          sucess: false,
          message: "Comment not found",
        };
      }

      let alreadyLiked = false;

      if (commentToLike.likes.users.includes(id)) {
        alreadyLiked = true;
        commentToLike.likes.users.pull(id);
        commentToLike.likes.total -= 1;
      } else {
        alreadyLiked = false;
        commentToLike.likes.users.push(id);
        commentToLike.likes.total += 1;
      }

      await commentToLike.save();

      return {
        sucess: true,
        message: alreadyLiked ? "Comment disliked" : "Comment liked",
      };
    } catch (error) {
      return {
        sucess: false,
        message: error.message,
      };
    }
  },
};

export default PostMutation;
