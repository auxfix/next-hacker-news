import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import { getNewsServer } from "@/lib/query/queries";

const typeDefs = gql`
  type HackerNews {
    authorId: String
    id: Int
    img: String
    karma: Int 
    num: Int
    score: Int
    time: Int
    title: String
    url: String
  }
  type Query {
    news: [HackerNews]
  }
`;

const resolvers = {
  Query: {
    news: async () => await getNewsServer(),
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };