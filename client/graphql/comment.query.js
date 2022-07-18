import { gql } from "@apollo/client";

const COMMENT_LIKE_DISLIKE_MUTATION = gql`
  mutation LIKE_DISLIKE_COMMENT($input: LikeDislikeCommentInput!) {
    likeDislikeComment(input: $input) {
      message
      sucess
    }
  }
`;

export { COMMENT_LIKE_DISLIKE_MUTATION };
