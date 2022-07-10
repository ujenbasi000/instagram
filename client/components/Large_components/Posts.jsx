import PostCard from "../Cards/PostCard";
import { posts } from "../../helpers/dummy_data";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/post.query";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { data, loading } = useQuery(GET_POSTS, {
    variables: {
      input: {
        limit: 10,
        skip: 0,
      },
    },
    context: {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzg2MWE2YzFkMTI3NGRiNmI0M2FkZCIsImlhdCI6MTY1NzQ3MjY5N30.rzRgSiU-Zi8kjKx6FL_zDMHcRfB-Jvcs2m9H980hZTs`,
      },
    },
  });

  useEffect(() => {
    if (!loading) {
      if (data.getPosts.sucess) {
        console.log(data.getPosts.data);
        setPosts(data.getPosts.data);
      }
    }
  }, [data]);

  return (
    <div className="container mx-auto py-14 flex items-center justify-center flex-col">
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};

export default Posts;
