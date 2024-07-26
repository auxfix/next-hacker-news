import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { buildSchema } from 'type-graphql'
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { RecipeResolver } from "@/lib/graphql/schema/news.resolver";

const schema = await buildSchema({
  resolvers: [RecipeResolver]
})


const server = new ApolloServer({
  schema,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };