import { Header, CreateNew, HomeContent, HeaderDivider } from "../components";
import { GET_AUTHORIZED_USER } from "../graphql/user.query";
import client from "../helpers/database";
import useGlobalcontext from "../hooks/useGlobalcontext";

const Home = ({ user, token }) => {
  const { setUser, setToken, createNew, setCreateNew } = useGlobalcontext();

  if (user) {
    setUser(user);
    setToken(token);
  }

  return (
    <div className="bg-background min-h-screen">
      <Header setCreateNew={setCreateNew} />
      <HeaderDivider />
      <HomeContent />
      {createNew && <CreateNew setCreateNew={setCreateNew} />}
    </div>
  );
};

export default Home;

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
        return {
          props: {
            token,
            user: data.getAuthorizedUser.data,
          },
        };
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
        props: {
          token: null,
          user: null,
        },
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
