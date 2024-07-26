import { ObjectType, Field } from 'type-graphql'

import "reflect-metadata";


@ObjectType()
export class HackerNews {
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