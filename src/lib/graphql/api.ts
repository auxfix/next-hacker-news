import { getSdk } from '@/generated/graphql';
import { GraphQLClient } from 'graphql-request';

const gqlQuaryClient = new GraphQLClient(process.env.GQL_SERVER + '/api/graphql');
export const { getNews: getNewsGql  } = getSdk(gqlQuaryClient);