import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GET_POSTS($input: LimitAndSkip!) {
    getPosts(input: $input) {
      data {
        caption
        _id
        likes {
          total
          users
        }
        comments {
          createdAt
          content
          user {
            username
            profile
          }
        }
        user {
          username
          profile
        }
        collections
      }
      message
      sucess
    }
  }
`;

export { GET_POSTS };
