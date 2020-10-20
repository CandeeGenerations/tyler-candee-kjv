import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {graphql, useStaticQuery} from 'gatsby'

import Section from '@components/Section'
import SocialLinks from '@components/SocialLinks'

import mediaqueries from '@styles/media'

import {getPassage, getVerse} from '../../../../api'
import './styles.css'
import NavigationMain from './Navigation.Main'

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            social {
              url
              name
            }
          }
        }
      }
    }
    allMdx(
      sort: {fields: frontmatter___date, order: ASC}
      filter: {frontmatter: {date: {ne: null}}}
    ) {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }
`

const Footer = () => {
  const results = useStaticQuery(siteQuery)
  const {name, social} = results.allSite.edges[0].node.siteMetadata

  const copyrightDate = (() => {
    const startYear = 2020
    const year = new Date().getFullYear()

    return `${startYear === year ? '' : `${startYear} - `}${year}`
  })()

  /** custom code below */

  const [showVerse, setShowVerse] = useState(false)

  const clickFunc = async (book, chapter, verse, endVerse) => {
    setShowVerse(false)

    const e = window.event
    let response = null
    let content = ''

    if (endVerse) {
      response = await getPassage(book, chapter, verse, endVerse)
      content = response.content
        .trim()
        .replace(/\n\s\s\s\s/g, '')
        .replace(/\u00B6\s/g, '')
        .replace(/\n/g, '<br />')
        .replace(/\s\s/g, '<br />')
        .replace(/[\t/[]/g, '')
        .replace(/] /g, '. ')
    } else {
      response = await getVerse(book, chapter, verse)
      content = response.content.trim().replace(/\u00B6\s/g, '')
    }

    if (response) {
      let left = e.pageX

      if (window.innerWidth < 500) {
        left = 5
      } else if (window.innerWidth - e.pageX < 500) {
        left = window.innerWidth - 550
      }

      setShowVerse(true)

      const verseElement = document.getElementById('verse')

      verseElement.style.top = `${e.pageY + 10}px`
      verseElement.style.left = `${left}px`
      verseElement.innerHTML = `<p id="verse-content"><span id="verse-reference">${response.reference}</span><br /><br />${content}</p>`
    }
  }

  useEffect(() => {
    const verseElements = document.getElementsByClassName('verse')

    for (var i = 0; i < verseElements.length; i++) {
      const verseElement = verseElements.item(i)
      const book = verseElement.getAttribute('data-book')
      const chapter = verseElement.getAttribute('data-chapter')
      const verse = verseElement.getAttribute('data-verse')
      const endVerse = verseElement.getAttribute('data-end-verse')

      verseElement.onclick = () => clickFunc(book, chapter, verse, endVerse)
    }

    document.addEventListener('mouseup', (e) => {
      const verseElement = document.getElementById('verse')
      let verseContent = null
      let verseReference = null

      if (verseElement) {
        verseContent = document.getElementById('verse-content')
        verseReference = document.getElementById('verse-reference')
      }

      if (
        verseElement !== e.target &&
        verseContent !== e.target &&
        verseReference !== e.target
      ) {
        setShowVerse(false)
      }
    })
  }, [])

  return (
    <>
      <FooterGradient />
      <Section narrow>
        <HoritzontalRule />
        <FooterContainer>
          <FooterText>
            © {copyrightDate} {name}
          </FooterText>
          <div>
            <SocialLinks links={social} />
          </div>
        </FooterContainer>
      </Section>
      <NavigationMain footer />
      {showVerse && <div id="verse" className="verse-overlay"></div>}
    </>
  )
}

export default Footer

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 80px;
  color: ${(p) => p.theme.colors.grey};

  ${mediaqueries.tablet`
    flex-direction: column;
    padding-bottom: 100px;
  `}

  ${mediaqueries.phablet`
    padding-bottom: 50px;
  `}
`

const HoritzontalRule = styled.div`
  position: relative;
  margin: 140px auto 50px;
  border-bottom: 1px solid ${(p) => p.theme.colors.horizontalRule};

  ${mediaqueries.tablet`
    margin: 60px auto;
  `}

  ${mediaqueries.phablet`
    display: none;
  `}
`

const FooterText = styled.div`
  ${mediaqueries.tablet`
    margin-bottom: 80px;
  `}

  ${mediaqueries.phablet`
    margin: 120px auto 100px;
  `}
`

const FooterGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${(p) => p.theme.colors.gradient};
  transition: ${(p) => p.theme.colorModeTransition};
`
