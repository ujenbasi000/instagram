import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LOGIN_USER($input: UserInput!) {
    loginUser(input: $input) {
      message
      sucess
      data {
        _id
        username
        profile
      }
    }
  }
`;
const REGISTER_MUTATION = gql`
  mutation CREATE_USER($input: CreateUserInput!) {
    createUser(input: $input) {
      data {
        _id
        username
        email
        profile
      }
      sucess
      message
    }
  }
`;

const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser {
    getAuthorizedUser {
      data {
        _id
        name
        username
        profile
      }
      message
      sucess
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation NEW_POST($input: CreatePostInput!) {
    createPost(input: $input) {
      sucess
      message
    }
  }
`;

export {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  GET_AUTHORIZED_USER,
  CREATE_POST_MUTATION,
};
