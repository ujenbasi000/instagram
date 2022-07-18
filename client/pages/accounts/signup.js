import { Register } from "../../components";

const Signup = () => {
  return <Register />;
};

export default Signup;

export const getServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  if (token) {
    return {
      props: {
        token: null,
      },
      redirect: {
        destination: "/",
      },
    };
  } else {
    return {
      props: {
        token: null,
      },
    };
  }
};
