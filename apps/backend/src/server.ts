import { ApolloServer } from 'apollo-server'
import { schema } from './resolver'

export const server = new ApolloServer({
  schema,
  cors: false,
})
