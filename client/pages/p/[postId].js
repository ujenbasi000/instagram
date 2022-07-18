import {
  Header,
  CreateNew,
  PostDetails,
  HeaderDivider,
} from "../../components";
import { GET_SINGLE_POST } from "../../graphql/post.query";
import { GET_AUTHORIZED_USER } from "../../graphql/query";
import client from "../../helpers/database";
import useGlobalcontext from "../../hooks/useGlobalcontext";

const SinglePost = ({ token, user, post }) => {
  const { setUser, setToken, createNew, setCreateNew } = useGlobalcontext();

  if (user) {
    setUser(user);
    setToken(token);
  }

  return (
    <div className="bg-background min-h-screen">
      <Header setCreateNew={setCreateNew} />
      <HeaderDivider />
      <PostDetails detail={post.getSinglePost.data[0]} />
      {createNew && <CreateNew setCreateNew={setCreateNew} />}
    </div>
  );
};

export default SinglePost;

export const getServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  try {
    if (token) {
      const { data } = await client.query({
        query: GET_AUTHORIZED_USER,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (data) {
        const { data: post } = await client.query({
          query: GET_SINGLE_POST,
          variables: {
            input: {
              id: ctx.query.postId,
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
        if (post.getSinglePost.data) {
          return {
            props: {
              user: data.getAuthorizedUser.data,
              token,
              post: post,
            },
          };
        } else {
          return {
            redirect: {
              destination: "/404",
            },
          };
        }
      } else {
        return {
          props: {
            token: null,
            user: null,
          },
        };
      }
    } else {
      return {
        redirect: {
          destination: "/accounts/signin",
        },
      };
    }
  } catch (err) {
    return {
      props: {
        token: null,
        user: null,
      },
    };
  }
};
