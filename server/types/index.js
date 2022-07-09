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
    description: String
    user: User!
    likes: LikeType!
    comments: [Comment!]
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
    data: [Post]
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
    description: String!
    collections: [String!]
    post: ID!
  }

  input SavePostInput {
    post: ID!
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

    createPost(input: CreatePostInput!): NormalResponse!
    likeDislikePost(input: SavePostInput!): NormalResponse!

    savePost(input: SavePostInput!): NormalResponse!
  }
`;

export default typeDefs;
