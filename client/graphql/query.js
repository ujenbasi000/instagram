import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LOGIN_USER($input: UserInput!) {
    loginUser(input: $input) {
      message
      sucess
      data {
        _id
        username
      }
    }
  }
`;

export { LOGIN_MUTATION };
