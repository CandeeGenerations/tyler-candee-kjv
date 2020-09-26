import {gql} from 'graphql-request'

export const FIND_COMMENTS = gql`
  query FindComments($slug: String!) {
    findComments(slug: $slug) {
      data {
        _id
        _ts
        name
        slug
        referenceComment
        comment
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $name: String!
    $slug: String!
    $comment: String!
    $referenceComment: ID
  ) {
    createComment(
      data: {
        name: $name
        slug: $slug
        comment: $comment
        referenceComment: $referenceComment
      }
    ) {
      _id
      _ts
      name
      slug
      referenceComment
      comment
    }
  }
`
