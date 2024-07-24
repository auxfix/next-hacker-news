import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { buildSchema, Resolver, Query, ObjectType, Field } from 'type-graphql'
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { getNewsServer } from "@/lib/query/queries";

import "reflect-metadata";

@ObjectType()
class HackerNews {
  @Field()
  authorId: String;

  @Field()
  id: number;

  @Field()
  img: String;

  @Field()
  karma: number;

  @Field()
  num: number;

  @Field()
  score: number;

  @Field()
  time: number;

  @Field()
  title: String;

  @Field()
  url: String;
}

@Resolver(HackerNews)
class RecipeResolver {
  @Query(returns => [HackerNews])
  async news() {
    return await getNewsServer();
  }
}

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