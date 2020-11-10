import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

import { Image } from '../components/Image'
import { LocalizedLink } from '../i18n'

type Props = PageProps<
  {
    allMdx: {
      edges: {
        node: {
          frontmatter: {
            title: string
          }
          fields: {
            name: string
            locale: string
          }
          parent: {
            relativeDirectory: string
          }
        }
      }[]
    }
  },
  { locale: string }
>

const Query = gql`
  query greet($name: String!) {
    greet(name: $name) {
      timestamp
      message
    }
  }
`

const IndexPage: FC<Props> = ({ data: { allMdx } }) => {
  const { data, error, loading } = useQuery<
    { greet: { message: string } },
    { name: string }
  >(Query, {
    pollInterval: 1000,
    variables: { name: `bill` }
  })
  return (
    <>
      <h1>Hi</h1>
      <p>Welcome to my site.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <h3>
        {error
          ? error.message
          : loading
          ? `loading`
          : data
          ? data.greet.message
          : `not loaded`}
      </h3>
      <div>
        {allMdx.edges.map(({ node: post }) => (
          <div>
            <h5>{post.frontmatter.title}</h5>
            <LocalizedLink to={`posts/${post.parent.relativeDirectory}`}>
              {post.parent.relativeDirectory}
            </LocalizedLink>
          </div>
        ))}
      </div>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query Toc($locale: String!) {
    allMdx(filter: { fields: { locale: { eq: $locale } } }) {
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            name
            locale
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
`
