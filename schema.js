import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Movie {
  title: String
  plot: String
}

type Query {
  semanticSearch(query: String!): [Movie]
}
`;
