import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload

  input CreateUserInput {
    email: String!
    password: String!
    name: String!
    username: String!
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

  type Collection {
    url: String!
    type: String!
    cloud_id: String!
  }

  type Post {
    _id: ID!
    collections: [Collection!]
    caption: String!
    user: User!
    likes: LikeType!
    saves: SaveType!
    comments: [Comment!]
    createdAt: String!
    updatedAt: String!
  }

  type LikeType {
    total: Int!
    users: [ID!]
  }

  type SaveType {
    users: [ID!]
  }

  type Comment {
    _id: ID!
    user: User!
    content: String!
    likes: LikeType!
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
  }

  type ResponseWithData {
    sucess: Boolean!
    message: String!
    data: Post
  }

  type ResponseWithComment {
    sucess: Boolean!
    message: String!
    data: Comment!
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
    collections: [Upload!]
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

  input SearchUserInput {
    search: String!
  }

  type SearchUserResponse {
    sucess: Boolean!
    message: String!
    data: [User]
  }

  type UserDetailsResponse {
    sucess: Boolean!
    message: String
    user: User
    posts: [Post]
  }

  input UserDetailsByUsernameInput {
    username: String!
  }

  type Query {
    getGreetings: String!
    getAuthorizedUser: UserResponse!

    getPosts(input: LimitAndSkip!): PostResponse!
    getSinglePost(input: GetSinglePostInput!): SavedPostResponse!
    getSavedPosts(input: LimitAndSkip!): PostResponse!
    getUserPost: PostResponse!
    getSearchedUser(input: SearchUserInput!): SearchUserResponse!
    getUserDetailsByUsername(
      input: UserDetailsByUsernameInput!
    ): UserDetailsResponse!
  }

  type Mutation {
    createUser(input: CreateUserInput!): UserResponse!
    loginUser(input: UserInput!): UserResponse!
    followUnfollowUser(input: FollowUnfollowUserInput!): NormalResponse!

    createPost(input: CreatePostInput!): NormalResponse!
    likeDislikePost(input: SavePostInput!): ResponseWithData!
    commentPost(input: CommentPostInput!): ResponseWithComment!
    likeDislikeComment(input: LikeDislikeCommentInput!): NormalResponse!

    savePost(input: SavePostInput!): NormalResponse!
  }
`;

export default typeDefs;
