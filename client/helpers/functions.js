export const like = async (
  id,
  post,
  user,
  setHasLiked,
  setPost,
  likePost,
  token,
  likePostMutation
) => {
  if (token) {
    const likeState = post.likes.users.find((like) => like === user._id);
    if (likeState) {
      setHasLiked(false);
      setPost({
        ...post,
        likes: {
          total: post.likes.total - 1,
          users: post.likes.users.filter((like) => like !== user._id),
        },
      });
    } else {
      setHasLiked(true);
      setPost({
        ...post,
        likes: {
          total: post.likes.total + 1,
          users: [...post.likes.users, user._id],
        },
      });
    }
    await likePost(likePostMutation, token, id);
  }
};

export const save = async (
  id,
  post,
  user,
  setHasSaved,
  setPost,
  savePost,
  token,
  savePostMutation
) => {
  if (token) {
    console.log({ post });
    const saveState = post.saves.users.find((save) => save === user._id);
    if (saveState) {
      setHasSaved(false);
      setPost({
        ...post,
        saves: {
          users: post.saves.users.filter((like) => like !== user._id),
        },
      });
    } else {
      setHasSaved(true);
      setPost({
        ...post,
        saves: {
          users: [...post.saves.users, user._id],
        },
      });
    }
    await savePost(savePostMutation, token, id);
  }
};

export const submitComment = async (
  e,
  token,
  setCommentLoading,
  commentPost,
  setPost,
  setOwnComment,
  setComment,
  commentPostMutation,
  comment,
  post,
  user
) => {
  console.log("Hello world!");
  e.preventDefault();
  try {
    setCommentLoading(true);
    if (token) {
      const data = await commentPost(
        commentPostMutation,
        token,
        post._id,
        comment
      );
      if (data.sucess) {
        setComment({ content: "" });

        setPost((prev) => {
          if (typeof setOwnComment === "function") {
            const comments = [data.data, ...prev.comments].map((comment) => {
              return comment.user._id === user._id ? comment : null;
            });

            if (comments) {
              setOwnComment(comments);
            }
          }
          return { ...prev, comments: [data.data, ...prev.comments] };
        });
      }
    }
    setCommentLoading(false);
  } catch (err) {
    console.log(err.message);
    setCommentLoading(false);
  }
};
