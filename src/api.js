import axios from 'axios'
import {GraphQLClient} from 'graphql-request'

export const getGQLClient = () =>
  new GraphQLClient(process.env.GATSBY_GRAPHQL_URL, {
    headers: {Authorization: `Bearer ${process.env.GATSBY_GRAPHQL_AUTH_KEY}`},
  })

export const sendNewCommentSlackMessage = ({_id, slug, comment}) => {
  const slackUrl = process.env.GATSBY_SLACK_WEBHOOK_URL

  if (!slackUrl) {
    return
  }

  axios.post(
    slackUrl,
    {
      username: 'Tyler Candee KJV',
      text: 'There is a new comment on your website:',
      attachments: [
        {
          fallback: comment,
          fields: [
            {
              title: 'Comment',
              short: false,
              value: comment,
            },
          ],
          actions: [
            {
              type: 'button',
              text: 'View Post',
              url: `${process.env.GATSBY_BASE_URL}/${slug}`,
            },
            {
              type: 'button',
              text: 'View Comment',
              url: `https://dashboard.fauna.com/collections/documents/Comment/${_id}/@db/${process.env.GATSBY_FAUNADB}`,
            },
            {
              type: 'button',
              text: 'Approve Comment',
              style: 'primary',
              url: `${process.env.GATSBY_BASE_URL}/approve-comment?cid=${_id}&s=${slug}`,
            },
          ],
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
}

export const getVerse = async (book, chapter, verse) => {
  const response = await axios.get(
    `${process.env.GATSBY_BIBLE_API_URL}bibles/${process.env.GATSBY_BIBLE_ID}/verses/${book}.${chapter}.${verse}?content-type=text&include-titles=false&include-verse-numbers=false`,
    {
      headers: {
        'api-key': process.env.GATSBY_BIBLE_API_KEY,
      },
    },
  )

  return response.data.data
}

export const getPassage = async (book, chapter, verse, endVerse) => {
  const response = await axios.get(
    `${process.env.GATSBY_BIBLE_API_URL}bibles/${process.env.GATSBY_BIBLE_ID}/passages/${book}.${chapter}.${verse}-${book}.${chapter}.${endVerse}?content-type=text&include-titles=false`,
    {
      headers: {
        'api-key': process.env.GATSBY_BIBLE_API_KEY,
      },
    },
  )

  return response.data.data
}

export const sendEmail = (data) => {
  const emailUrl = process.env.GATSBY_EMAIL_SERVER

  if (!emailUrl) {
    return
  }

  axios.post(`${emailUrl}/new-comment`, {
    to: process.env.GATSBY_TO_EMAIL,
    data: {...data, baseUrl: process.env.GATSBY_BASE_URL},
  })
}
