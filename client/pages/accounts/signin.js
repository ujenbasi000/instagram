import Login from "../../components/Authentication/Login";

const Signin = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default Signin;

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
