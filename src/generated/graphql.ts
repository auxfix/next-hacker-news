import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type HackerNews = {
  __typename?: 'HackerNews';
  authorId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  img: Scalars['String']['output'];
  karma: Scalars['Float']['output'];
  num: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
  time: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  news: Array<HackerNews>;
};

export type GetNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsQuery = { __typename?: 'Query', news: Array<{ __typename?: 'HackerNews', authorId: string, id: number, img: string, karma: number, num: number, score: number, time: number, title: string }> };


export const GetNewsDocument = gql`
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
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getNews(variables?: GetNewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetNewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNewsQuery>(GetNewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNews', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;