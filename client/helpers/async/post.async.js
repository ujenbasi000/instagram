const likePost = async (func, token, id) => {
  const { data } = await func({
    variables: {
      input: {
        post: id,
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  if (data) {
    if (data.likeDislikePost) {
      return data.likeDislikePost;
    }
  }
};

const commentPost = async (func, token, id, comment) => {
  const { data } = await func({
    variables: {
      input: {
        post: id,
        comment: comment.content,
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  if (data) {
    if (data.commentPost) {
      return data.commentPost;
    }
  }
};

const savePost = async (func, token, id) => {
  const { data } = await func({
    variables: {
      input: {
        post: id,
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  if (data) {
    console.log({ data });
  }
};

const likeDislikeComment = async (func, token, id) => {
  const { data } = await func({
    variables: {
      input: {
        comment: id,
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  console.log(data);
};

export { likePost, commentPost, savePost, likeDislikeComment };
