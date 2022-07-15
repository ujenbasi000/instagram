import PostCard from "../Cards/PostCard";
import { useLazyQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/post.query";
import { useEffect, useState } from "react";
import Stories from "./Stories";
import useGlobalcontext from "../../hooks/useGlobalcontext";
import ViewPost from "./ViewPost";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useGlobalcontext();
  const [viewPost, setViewPost] = useState(false);
  const [viewPostId, setViewPostId] = useState(null);
  const [GetPosts, { data, loading }] = useLazyQuery(GET_POSTS, {
    variables: {
      input: {
        limit: 10,
        skip: 0,
      },
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    GetPosts();
  }, [token]);

  useEffect(() => {
    if (!loading) {
      if (data) {
        if (data.getPosts.sucess) {
          setPosts(data.getPosts.data);
        }
      }
    }
  }, [data]);

  return (
    <div className="w-full flex-1">
      <Stories />
      {posts.map((post) => (
        <PostCard
          post={post}
          viewPost={viewPost}
          setViewPost={setViewPost}
          viewPostId={viewPostId}
          setViewPostId={setViewPostId}
        />
      ))}
      {viewPost && viewPostId && (
        <ViewPost
          setViewPost={setViewPost}
          viewPostId={viewPostId}
          setViewPostId={setViewPostId}
        />
      )}
    </div>
  );
};

export default Posts;
