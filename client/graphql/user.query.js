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

const SEARCH_USER_QUERY = gql`
  query SEARCH_USER($input: SearchUserInput!) {
    getSearchedUser(input: $input) {
      data {
        username
        name
        _id
        profile
      }
      sucess
      message
    }
  }
`;

const GET_USER_DETAILS_QUERY = gql`
  query GET_USER_DETAILS_BY_USERNAME($input: UserDetailsByUsernameInput!) {
    getUserDetailsByUsername(input: $input) {
      sucess
      message
      posts {
        _id
        caption
        collections {
          type
          url
        }
      }
      user {
        username
        name
        profile
        followers {
          _id
        }
        following {
          _id
        }
        website
        bio
        gender
        phone
      }
    }
  }
`;

export {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  GET_AUTHORIZED_USER,
  SEARCH_USER_QUERY,
  GET_USER_DETAILS_QUERY,
};
