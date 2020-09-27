import {gql} from 'graphql-request'

export const FIND_COMMENT = gql`
  query FindCommentByID($id: ID!) {
    findCommentByID(id: $id) {
      _id
      _ts
      name
      slug
      referenceComment
      comment
      approved
    }
  }
`

export const FIND_APPROVED_COMMENTS = gql`
  query FindApprovedComments($slug: String!) {
    findApprovedComments(slug: $slug, approved: true) {
      data {
        _id
        _ts
        name
        slug
        referenceComment
        comment
        approved
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
        approved: false
      }
    ) {
      _id
      _ts
      name
      slug
      referenceComment
      comment
      approved
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation UpdateComment(
    $_id: ID!
    $name: String!
    $slug: String!
    $comment: String!
    $referenceComment: ID
    $approved: Boolean!
  ) {
    updateComment(
      id: $_id
      data: {
        name: $name
        slug: $slug
        comment: $comment
        referenceComment: $referenceComment
        approved: $approved
      }
    ) {
      _id
      _ts
      name
      slug
      referenceComment
      comment
      approved
    }
  }
`
