import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GET_POSTS($input: LimitAndSkip!) {
    getPosts(input: $input) {
      data {
        _id
        caption
        createdAt
        likes {
          total
          users
        }
        comments {
          _id
          likes {
            total
            users
          }
          content
          user {
            _id
            username
          }
        }
        user {
          username
          profile
        }
        collections {
          url
          type
        }
      }
      message
      sucess
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation LIKE_DISLIKE_POST($input: SavePostInput!) {
    likeDislikePost(input: $input) {
      message
      sucess
      data {
        likes {
          total
          users
        }
      }
    }
  }
`;

const COMMENT_POST_MUTATION = gql`
  mutation COMMENT_POST($input: CommentPostInput!) {
    commentPost(input: $input) {
      message
      sucess
      data {
        content
        createdAt
        likes {
          total
          users
        }
        updatedAt
        user {
          username
          _id
        }
      }
    }
  }
`;

const GET_SINGLE_POST = gql`
  query GET_SINGLE_POST($input: GetSinglePostInput!) {
    getSinglePost(input: $input) {
      data {
        _id
        caption
        createdAt
        collections {
          url
          type
        }
        likes {
          total
          users
        }
        user {
          _id
          profile
          username
        }
        comments {
          _id
          content
          createdAt
          likes {
            total
            users
          }
          user {
            _id
            profile
            username
          }
        }
      }
      message
      sucess
      hasSaved
    }
  }
`;

export {
  GET_POSTS,
  LIKE_POST_MUTATION,
  COMMENT_POST_MUTATION,
  GET_SINGLE_POST,
};
