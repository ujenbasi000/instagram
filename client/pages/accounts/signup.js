import Register from "../../components/Authentication/Register";

const Signup = () => {
  return <Register />;
};

export default Signup;

export const getServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  if (token) {
    return {
      props: {
        token: {},
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
