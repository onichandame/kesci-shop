import React, { FC } from "react"
import { WrapRootElementBrowserArgs } from "gatsby"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "@apollo/client"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  link: new HttpLink({ uri: `http://localhost/graphql`, fetch }),
  cache: new InMemoryCache()
})

export const wrapRootElement: FC<WrapRootElementBrowserArgs> = ({
  element
}) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
