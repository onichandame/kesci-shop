import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { gql } from 'apollo-server'

import { server } from '../src/server'

const GreetSchema = gql`
  query greet($name: String!) {
    greet(name: $name) {
      timestamp
      message
    }
  }
`

describe(`test apollo server`, () => {
  let client: ApolloServerTestClient
  beforeAll(() => {
    client = createTestClient(server)
  })
  test(`can be queried`, async () => {
    const { query } = client
    const res = await query({
      query: GreetSchema,
      variables: { name: `jerry` },
    })
    expect(res.data).toBeTruthy()
  })
})
