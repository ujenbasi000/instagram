import { PostModel as Post, CommentModel as Comment } from "../models/index.js";
import auth from "../middleware/auth.js";
import cloudinary from "../configs/cloudinary.js";

const PostMutation = {
  createPost: async (_, { input }, ctx) => {
    try {
      const { id } = await auth(ctx);
      if (!id) {
        return {
          sucess: false,
          message: "User not found",
          data: null,
        };
      }

      const { collections, ...others } = input;
      const urls = [];
      for (let i = 0; i < collections.length; i++) {
        const {
          file: { createReadStream },
        } = await collections[i];
        const { file } = await collections[i];
        const fileStream = createReadStream();

        const response = await new Promise((resolve, reject) => {
          const cloudStream = cloudinary.v2.uploader.upload_stream(
            {
              resource_type: "auto",
              folder: "instagram",
              upload_preset: "instagram_preset",
            },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            }
          );
          fileStream.pipe(cloudStream);
        });

        urls.push({
          type: file.mimetype.includes("video") ? "video" : "image",
          cloud_id: response.public_id,
          url: response.secure_url,
        });
      }

      const post = await Post.create({
        ...others,
        collections: urls,
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
        data: postToLike,
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
          data: null,
        };
      }

      const { post, comment } = input;

      if (!comment) {
        return {
          sucess: false,
          message: "Comment is required",
          data: null,
        };
      }

      let postToComment = await Post.findById(post);
      if (!postToComment) {
        return {
          sucess: false,
          message: "Post not found",
          data: null,
        };
      }

      let newComment = await Comment.create({
        content: comment,
        user: id,
        post,
      });

      newComment = await newComment.populate("user");

      postToComment.comments = [newComment._id].concat(postToComment.comments);

      await postToComment.save();

      return {
        sucess: true,
        message: "Comment created",
        data: newComment,
      };
    } catch (err) {
      return {
        sucess: false,
        message: err.message,
        data: null,
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
