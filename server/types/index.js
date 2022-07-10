import { gql } from "apollo-server-express";

const typeDefs = gql`
  input CreateUserInput {
    email: String!
    password: String!
    name: String!
  }

  input UserInput {
    emailOrUsername: String!
    password: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    username: String!
    createdAt: String!
    updatedAt: String!
    following: [User!]
    followers: [User!]
    bio: String
    profile: String
    website: String
    phone: String
    gender: String
  }

  type Post {
    _id: ID!
    collections: [String!]
    caption: String!
    user: User!
    likes: LikeType!
    comments: [Comment!]
    createdAt: String!
    updatedAt: String!
  }

  type LikeType {
    total: Int!
    users: [ID!]
  }

  type Comment {
    user: User!
    content: String!
    likes: Int!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type NormalResponse {
    sucess: Boolean!
    message: String!
  }

  type UserResponse {
    sucess: Boolean!
    message: String!
    data: User
  }

  type PostResponse {
    sucess: Boolean!
    message: String!
    data: [Post!]
  }

  type SavedPostResponse {
    sucess: Boolean!
    message: String!
    data: [Post]
    hasSaved: Boolean!
  }

  input LimitAndSkip {
    limit: Int!
    skip: Int!
  }

  input GetSinglePostInput {
    id: ID!
  }

  input CreatePostInput {
    caption: String!
    collections: [String!]
    post: ID!
  }

  input SavePostInput {
    post: ID!
  }

  input CommentPostInput {
    post: ID!
    comment: String!
  }

  input LikeDislikeCommentInput {
    comment: ID!
  }

  input FollowUnfollowUserInput {
    userId: ID!
  }

  type Query {
    getGreetings: String!
    getAuthorizedUser: UserResponse!

    getPosts(input: LimitAndSkip!): PostResponse!
    getSinglePost(input: GetSinglePostInput!): SavedPostResponse!
    getSavedPosts(input: LimitAndSkip!): PostResponse!
    getUserPost: PostResponse!
  }

  type Mutation {
    createUser(input: CreateUserInput!): UserResponse!
    loginUser(input: UserInput!): UserResponse!
    followUnfollowUser(input: FollowUnfollowUserInput!): NormalResponse!

    createPost(input: CreatePostInput!): NormalResponse!
    likeDislikePost(input: SavePostInput!): NormalResponse!
    commentPost(input: CommentPostInput!): NormalResponse!
    likeDislikeComment(input: LikeDislikeCommentInput!): NormalResponse!

    savePost(input: SavePostInput!): NormalResponse!
  }
`;

export default typeDefs;
