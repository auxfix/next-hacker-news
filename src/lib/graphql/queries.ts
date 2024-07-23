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
        "http://localhost:3000/api/news/graphql",
        getNewsQuery
      );
  
    return await news;
}