import { split, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const httpLink = new HttpLink({ uri: `http://localhost/graphql` })
const wsLink = new WebSocketLink({
  uri: `ws://localhost/graphql`,
  options: { reconnect: true }
})
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === `OperationDefinition` &&
      definition.operation === `subscription`
    )
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({ link, cache: new InMemoryCache() })
