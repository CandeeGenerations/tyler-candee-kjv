import axios from 'axios'

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
