import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GET_POSTS($input: LimitAndSkip!) {
    getPosts(input: $input) {
      data {
        _id
        caption
        createdAt
        saves {
          users
        }
        likes {
          total
          users
        }
        user {
          username
          profile
        }
        collections {
          url
          type
        }
        comments {
          _id
          content
          likes {
            total
            users
          }
          user {
            _id
            username
          }
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
        _id
        content
        createdAt
        updatedAt
        likes {
          total
          users
        }
        user {
          _id
          username
        }
      }
    }
  }
`;

const SAVE_POST_MUTATION = gql`
  mutation SAVE_POST($input: SavePostInput!) {
    savePost(input: $input) {
      message
      sucess
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
        saves {
          users
        }
        user {
          _id
          profile
          username
          name
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
  GET_POSTS,
  LIKE_POST_MUTATION,
  COMMENT_POST_MUTATION,
  GET_SINGLE_POST,
  SAVE_POST_MUTATION,
  CREATE_POST_MUTATION,
};
