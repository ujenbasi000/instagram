import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Header,
  CreateNew,
  HeaderDivider,
  ProfileBody,
  ProfileHeader,
} from "../components";
import {
  GET_AUTHORIZED_USER,
  GET_USER_DETAILS_QUERY,
} from "../graphql/user.query";
import client from "../helpers/database";
import useGlobalcontext from "../hooks/useGlobalcontext";

const Profile = ({ user, token }) => {
  const { username } = useRouter().query;
  const { createNew, setCreateNew, setUser, setToken } = useGlobalcontext();

  useEffect(() => {
    setToken(token);
    setUser(user);
  }, [user]);

  const [getUserDetails] = useLazyQuery(GET_USER_DETAILS_QUERY);
  const [details, setDetails] = useState({});

  useEffect(() => {
    (async () => {
      if (username) {
        const { data } = await getUserDetails({
          variables: { input: { username } },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
        if (data) {
          if (
            data.getUserDetailsByUsername &&
            data.getUserDetailsByUsername.sucess
          ) {
            setDetails({
              user: data.getUserDetailsByUsername.user,
              posts: data.getUserDetailsByUsername.posts,
            });
          }
        }
      }
    })();
  }, [username]);

  return (
    <div className="bg-background min-h-screen">
      <Header setCreateNew={setCreateNew} />
      <HeaderDivider />
      <ProfileHeader
        user={details?.user}
        setDetails={setDetails}
        postLenght={details?.posts?.length}
      />
      <ProfileBody posts={details?.posts} />
      {createNew && <CreateNew setCreateNew={setCreateNew} />}
    </div>
  );
};

export default Profile;

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
