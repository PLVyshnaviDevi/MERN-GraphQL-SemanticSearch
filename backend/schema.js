import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    plot: String
    poster: String
  }

  type Query {
    semanticSearch(query: String!): [Movie]
  }
`;
