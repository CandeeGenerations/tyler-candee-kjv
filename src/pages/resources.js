import React, {useEffect, useContext} from 'react'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import mediaqueries from '@styles/media'

import SEO from '@narative/gatsby-theme-novela/src/components/SEO'
import Image from '@narative/gatsby-theme-novela/src/components/Image'
import Layout from '@narative/gatsby-theme-novela/src/components/Layout'
import Section from '@narative/gatsby-theme-novela/src/components/Section'
import Headings from '@narative/gatsby-theme-novela/src/components/Headings'
import {GridLayoutContext} from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List.Context'

import help4Today from '../assets/help4today.png'
import dailyInTheWord from '../assets/dailyintheword.png'

const ListItem = ({resource, narrow}) => {
  const {gridLayout} = useContext(GridLayoutContext)
  const hasOverflow = narrow && resource.title.length > 35
  // const imageSource = narrow ? resource.hero.narrow : resource.hero.regular;

  return (
    <ArticleLink
      href={`${resource.link}?ref=kjv.cgen.cc`}
      target="_blank"
      data-a11y="false"
    >
      <Item gridLayout={gridLayout}>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          <Image src={resource.image} />
        </ImageContainer>

        <div>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {resource.title}
          </Title>

          <Excerpt
            narrow={narrow}
            hasOverflow={hasOverflow}
            gridLayout={gridLayout}
          >
            {resource.excerpt}
          </Excerpt>
        </div>
      </Item>
    </ArticleLink>
  )
}

const Resources = () => {
  const resourceList = [
    {
      image: dailyInTheWord,
      link: 'https://devo.paulchappell.com',
      title: 'Daily in the Word',
      excerpt:
        'Bringing the Gospel to growing Christians around the world through radio, podcast, and daily devotionals every day.',
    },
    {
      image: help4Today,
      link: 'https://help4today.org',
      title: 'Help for Today',
      excerpt:
        'Daily Help for Your Christian Walk. A ministry of North Valley Baptist Church, Santa Clara, California.',
    },
  ]

  const {gridLayout = 'tiles', hasSetGridLayout, getGridLayout} = useContext(
    GridLayoutContext,
  )

  const resourcePairs = resourceList.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2))
    }
    return result
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => getGridLayout(), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <SEO />
      <NSection>
        <Headings.h1>Resources</Headings.h1>

        <Text css={{marginTop: 10, marginBottom: 50}}>
          Here are some helpful resources to help you along your journey as a
          child of God.
        </Text>

        <ArticlesListContainer alwaysShowAllDetails={true}>
          {resourcePairs.map((ap, index) => {
            const isEven = index % 2 !== 0
            const isOdd = index % 2 !== 1

            return (
              <List
                key={index}
                gridLayout={gridLayout}
                hasOnlyOneArticle={false}
                reverse={isEven}
              >
                <ListItem resource={ap[0]} narrow={isEven} />
                <ListItem resource={ap[1]} narrow={isOdd} />
              </List>
            )
          })}
        </ArticlesListContainer>
      </NSection>
    </Layout>
  )
}

const NSection = styled(Section)`
  margin-top: 100px;
`

const color = (p) => css`
  color: ${p.theme.colors.primary};
`

const Text = styled.p`
  ${color}
`

const wide = '1fr'
const narrow = '457px'

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`

const ArticlesListContainer = styled.div`
  transition: opacity 0.25s;
  ${(p) => p.alwaysShowAllDetails && showDetails}
`

const listTile = (p) => css`
  position: relative;
  display: grid;
  grid-template-columns: ${p.reverse
    ? `${narrow} ${wide}`
    : `${wide} ${narrow}`};
  grid-template-rows: 2;
  column-gap: 30px;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`

const listItemRow = (p) => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-bottom: 50px;

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`

const listItemTile = (p) => css`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`

// If only 1 article, dont create 2 rows.
const listRow = (p) => css`
  display: grid;
  grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr 1fr'};
`

const List = styled.div`
  ${(p) => (p.gridLayout === 'tiles' ? listTile : listRow)}
`

const Item = styled.div`
  ${(p) => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
`

const ImageContainer = styled.div`
  position: relative;
  height: ${(p) => (p.gridLayout === 'tiles' ? '280px' : '220px')};
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: ${(p) => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
    height: 200px;
    margin-bottom: 35px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`

const Title = styled(Headings.h2)`
  font-size: 21px;
  font-family: ${(p) => p.theme.fonts.serif};
  margin-bottom: ${(p) =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '10px'};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${(p) => p.theme.colors.grey};
  display: ${(p) =>
    p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box'};
  max-width: ${(p) => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    margin-bottom; 15px;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`

const ArticleLink = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
      0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h2,
  &:focus h2 {
    color: ${(p) => p.theme.colors.accent};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${(p) => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`

export default Resources
