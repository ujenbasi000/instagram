import { useState } from "react";
import { Header } from "../components";
import CreateNew from "../components/Large_components/CreateNew";
import HomeContent from "../components/Large_components/HomeContent";
import HeaderDivider from "../components/MiniComponents/HeaderDivider";
import { GET_AUTHORIZED_USER } from "../graphql/query";
import client from "../helpers/database";
import useGlobalcontext from "../hooks/useGlobalcontext";

const Home = ({ user, token }) => {
  const { setUser, setToken } = useGlobalcontext();
  const [createNew, setCreateNew] = useState(false);

  if (user) {
    setUser(user);
    setToken(token);
  }

  return (
    <div className="bg-background">
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
};
