import React from 'react'

import Layout from '@narative/gatsby-theme-novela/src/components/Layout'
import Blockquote from '@narative/gatsby-theme-novela/src/components/Blockquote'
import Section from '@narative/gatsby-theme-novela/src/components/Section'
import SEO from '@narative/gatsby-theme-novela/src/components/SEO'
import Headings from '@narative/gatsby-theme-novela/src/components/Headings'

import ButtonLink from '../components/ButtonLink'

function NotFoundPage() {
  return (
    <Layout>
      <SEO />
      <Section>
        <div style={{marginTop: '100px'}}>
          <Headings.h1>Jeremiah 29:13 says...</Headings.h1>

          <Blockquote css={{fontSize: 20, marginBottom: 20}}>
            And ye shall seek me, and find me, when ye shall search for me with
            all your heart.
          </Blockquote>

          <p>Looks like you must keep seeking :)</p>

          <div css={{padding: '40px 0'}}>
            <ButtonLink href="/" text="Go Home" />
          </div>

          <small css={{fontSize: 11}}>
            <em>404: Page not found</em>
          </small>
        </div>
      </Section>
    </Layout>
  )
}

export default NotFoundPage
