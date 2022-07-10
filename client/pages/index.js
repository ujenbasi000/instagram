import Login from "../components/Authentication/Login";
import Posts from "../components/Large_components/Posts";
import useGlobalcontext from "../hooks/useGlobalcontext";

const Home = ({ token }) => {
  const { token: tkn, details } = useGlobalcontext();
  console.log({ tkn, details });
  return token ? <Posts /> : <Login />;
};

export default Home;

Home.getInitialProps = async (ctx) => {
  return {
    token: ctx.req.cookies,
  };
};
