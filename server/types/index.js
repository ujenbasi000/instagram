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
    collection: [Post!]
    bio: String
    profile: String
    website: String
    phone: String
    gender: String
  }

  type Post {
    collection: [String!]
    description: String
    user: User!
    likes: Int
    comments: [Comment!]
  }

  type Comment {
    user: User!
    content: String!
    likes: Int!
    post: Post!
  }

  type Response {
    sucess: Boolean!
    message: String!
    data: User
  }

  type Query {
    getGreetings: String!
    getAuthorizedUser: Response!
  }

  type Mutation {
    createUser(input: CreateUserInput!): Response!
    loginUser(input: UserInput!): Response!
  }
`;

export default typeDefs;
