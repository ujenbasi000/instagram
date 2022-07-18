import PostCard from "../Cards/PostCard";
import { useLazyQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/post.query";
import { useEffect, useState } from "react";
import Stories from "./Stories";
import useGlobalcontext from "../../hooks/useGlobalcontext";
import ViewPost from "./ViewPost";
import Spinner from "../Loadings/Spinner";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { token, refetchState } = useGlobalcontext();
  const [viewPost, setViewPost] = useState(false);
  const [viewPostId, setViewPostId] = useState(null);

  // useEffect(() => console.log({ posts }), [posts]);

  const [GetPosts, { data, loading, refetch }] = useLazyQuery(GET_POSTS, {
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

  useEffect(() => {
    if (refetchState) {
      refetch();
    }
  }, [refetchState]);

  return (
    <div className="w-full flex-1">
      <Stories />
      {loading && (
        <div className="h-96 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {posts.map((post) => (
        <PostCard
          key={post._id}
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
          setPosts={setPosts}
        />
      )}
    </div>
  );
};

export default Posts;
