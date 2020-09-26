import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {GraphQLClient} from 'graphql-request'

import Comment from './components/Comment'
import {FIND_COMMENTS, CREATE_COMMENT} from './gql'

const Comments = () => {
  const [gqlClient] = useState(
    new GraphQLClient(process.env.GATSBY_GRAPHQL_URL, {
      headers: {Authorization: `Bearer ${process.env.GATSBY_GRAPHQL_AUTH_KEY}`},
    }),
  )
  const [slug, setSlug] = useState('')
  const [comments, setComments] = useState({})
  const [commentKeys, setCommentKeys] = useState([])
  const [loading, setLoading] = useState(true)

  const findComments = async (s) => {
    setLoading(true)

    const response = await gqlClient.request(FIND_COMMENTS, {slug: slug || s})
    const c = response.findComments.data
    const commentsData = {}

    c.forEach((comment) => {
      if (!comment.referenceComment) {
        commentsData[comment._id] = {...comment, childComments: []}
      } else {
        commentsData[comment.referenceComment].childComments.push(comment)
      }
    })

    setComments(commentsData)
    setCommentKeys(Object.keys(commentsData))
    setLoading(false)
  }

  useEffect(() => {
    const locArr = window.location.href.split('/')
    const s = locArr[locArr.length - 1].split('?')[0]

    setSlug(s)
    findComments(s)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const saveComment = async (data) => {
    await gqlClient.request(CREATE_COMMENT, {
      ...data,
      slug,
    })
    findComments(slug)
  }

  return (
    <CommentsSection>
      <CommentsBorder />
      <CommentsHeader>Comments</CommentsHeader>

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <CommentsContainer>
          {commentKeys.length > 0 ? (
            commentKeys.map((key) => {
              const comment = comments[key]

              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  saveComment={saveComment}
                />
              )
            })
          ) : (
            <Comment saveComment={saveComment} noComment />
          )}

          <Comment saveComment={saveComment} newComment />
        </CommentsContainer>
      )}
    </CommentsSection>
  )
}

const CommentsSection = styled.div`
  padding: 50px 0 50px;
  margin: 0 auto;
  max-width: 1140px;
  width: 100%;

  @media (max-width: 1220px) and (min-width: 736px) {
    padding-right: 68px;
  }
`

const CommentsBorder = styled.div`
  border-bottom: 1px solid #d8d8db;
  margin-bottom: 20px;
`

const CommentsHeader = styled.h3`
  font-family: 'Merriweather', Georgia, Serif;
  font-size: 22px;
  line-height: 1.4;
  font-weight: bold;
  max-width: 100% !important;

  @media (max-width: 735px) {
    padding: 0 20px;
  }
`

const CommentsContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #d8d8db;
  background-color: #fff;

  @media (max-width: 735px) {
    border-radius: 0;
    border-right: 0;
    border-left: 0;
  }
`

export default Comments
