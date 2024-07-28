import { request, gql } from "graphql-request";
import { HackerStory } from "@/types";

const getNewsQuery = gql`
  query getNews {
    news {
        authorId
        id
        img
        karma
        num
        score
        time
        title
        url
    }
  }
`;

interface QueryData {
  news: HackerStory[];
}

export const getNewsGqlClient = async () => {
    const { news } = await request<QueryData>(
        process.env.GQL_SERVER  + "/api/graphql",
        getNewsQuery
      );
  
    return await news;
}