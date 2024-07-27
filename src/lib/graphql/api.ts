import { getSdk } from '@/generated/graphql';
import { GraphQLClient } from 'graphql-request';

const gqlQuaryClient = new GraphQLClient('http://localhost:3000/api/graphql');
export const { getNews: getNewsGql  } = getSdk(gqlQuaryClient);