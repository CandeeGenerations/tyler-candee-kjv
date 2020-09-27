import React, {useEffect, useState} from 'react'
import qs from 'querystring'
import styled from '@emotion/styled'

import Layout from '@narative/gatsby-theme-novela/src/components/Layout'
import Section from '@narative/gatsby-theme-novela/src/components/Section'
import Headings from '@narative/gatsby-theme-novela/src/components/Headings'
import Code from '@narative/gatsby-theme-novela/src/components/Code'

import {getGQLClient} from '../api'
import ButtonLink from '../components/ButtonLink'
import {
  FIND_COMMENT,
  UPDATE_COMMENT,
} from '../@narative/gatsby-theme-novela/components/Comments/gql'

function ApproveComment() {
  const [gqlClient] = useState(getGQLClient())
  const [commentId, setCommentId] = useState('')
  const [slug, setSlug] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const queryArr = window.location.href.split('?')

    if (queryArr.length < 1) {
      setError(true)
      return
    }

    const params = qs.parse(queryArr[1])

    if (!params.cid) {
      setError(true)
      return
    }

    setCommentId(params.cid)
    setSlug(params.s)
  }, [])

  const updateComment = async () => {
    let response = await gqlClient.request(FIND_COMMENT, {
      id: commentId,
    })
    const comment = response.findCommentByID
    delete comment._ts

    response = await gqlClient.request(UPDATE_COMMENT, {
      ...comment,
      approved: true,
    })

    setLoading(false)
  }

  useEffect(() => {
    updateComment()
  }, [commentId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <Section>
        <div style={{textAlign: 'center', marginTop: 100}}>
          {error ? (
            <div>
              <Headings.h1>An error occurred</Headings.h1>
              <InfoText>Please check your URL for errors</InfoText>
            </div>
          ) : (
            <div>
              <Headings.h1>
                {loading ? 'Approving Comment...' : 'Comment Approved!'}
              </Headings.h1>
              <InfoText css={{marginBottom: 50}}>
                Comment Id: <Code.Pre>{commentId}</Code.Pre>
              </InfoText>
              {!loading && <ButtonLink to={`/${slug}`} text="View Post" />}
            </div>
          )}
        </div>
      </Section>
    </Layout>
  )
}

const InfoText = styled.div`
  margin-top: 20px;
`

export default ApproveComment
