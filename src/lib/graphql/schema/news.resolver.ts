import { Resolver, Query } from 'type-graphql'

import { getNewsServer } from "@/lib/query/queries";

import "reflect-metadata";
import { HackerNews } from "./news";

@Resolver(HackerNews)
export class RecipeResolver {
  @Query(returns => [HackerNews])
  async news() {
    return await getNewsServer();
  }
}