import axios from 'axios'

import {BIBLE_API_URL, BIBLE_API_KEY, BIBLE_ID} from './constants.js'

export const getVerse = async (book, chapter, verse) => {
  const response = await axios.get(
    `${BIBLE_API_URL}bibles/${BIBLE_ID}/verses/${book}.${chapter}.${verse}?content-type=text&include-titles=false&include-verse-numbers=false`,
    {
      headers: {
        'api-key': BIBLE_API_KEY,
      },
    },
  )

  return response.data.data
}

export const getPassage = async (book, chapter, verse, endVerse) => {
  const response = await axios.get(
    `${BIBLE_API_URL}bibles/${BIBLE_ID}/passages/${book}.${chapter}.${verse}-${book}.${chapter}.${endVerse}?content-type=text&include-titles=false`,
    {
      headers: {
        'api-key': BIBLE_API_KEY,
      },
    },
  )

  return response.data.data
}
