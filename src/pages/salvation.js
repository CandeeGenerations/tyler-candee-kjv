import React from 'react'
import styled from '@emotion/styled'
import {Global, css} from '@emotion/core'

import Layout from '@narative/gatsby-theme-novela/src/components/Layout'
import Blockquote from '@narative/gatsby-theme-novela/src/components/Blockquote'
import Section from '@narative/gatsby-theme-novela/src/components/Section'
import SEO from '@narative/gatsby-theme-novela/src/components/SEO'
import Headings from '@narative/gatsby-theme-novela/src/components/Headings'

import ButtonLink from '../components/ButtonLink'

function Salvation() {
  return (
    <Layout>
      <Global
        styles={css`
          blockquote > p {
            @media screen and (max-width: 735px) {
              padding: 0 !important;
            }
          }
        `}
      />
      <SEO />
      <Section>
        <SalvationContainer>
          <Headings.h1>Salvation</Headings.h1>

          <Headings.h3 css={{marginTop: 50}}>
            Are you <strong>100%</strong> sure that if you died right now that
            you would go to heaven?
          </Headings.h3>

          <Text css={{marginTop: 50}}>
            The Bible says you can <strong>know</strong> that you have eternal
            life.
          </Text>

          <Blockquote>
            <p>
              These things have I written unto you that believe on the name of
              the Son of God; that ye may know that ye have eternal life, and
              that ye may believe on the name of the Son of God
            </p>
            <footer>- 1 John 5:13</footer>
          </Blockquote>

          <Text>First, admit that you (as all of us) have sinned.</Text>

          <Blockquote>
            <p>For all have sinned, and come short of the glory of God.</p>
            <footer>-Romans 3:23</footer>
          </Blockquote>

          <Text>
            Second, recognize that the price of our sin is death and hell.
          </Text>

          <Blockquote>
            <p>For the wages of sin is death.</p>
            <footer>-Romans 6:23a</footer>
          </Blockquote>

          <Text>
            Third, understand that eternal life is a free gift from God. This
            gift cannot be earned and it is available to you if you will receive
            the Lord Jesus Christ as your personal Savior. Salvation is not in
            the church, religion, or good works, but in Jesus Christ alone!
          </Text>

          <Blockquote>
            <p>
              But the gift of God is eternal life through Jesus Christ our Lord.
            </p>
            <footer>- Romans 6:23b</footer>
          </Blockquote>

          <Text>
            Finally, call on the Lord in prayer and by faith ask Him to save
            you!
          </Text>

          <Blockquote>
            <p>
              That if thou shalt confess with thy mouth the Lord Jesus, and
              shalt believe in thine heart that God hath raised him from the
              dead, thou shalt be saved. For with the heart man believeth unto
              righteousness; and with the mouth confession is made unto
              salvation...For whosoever shall call upon the name of the Lord
              shall be saved.
            </p>

            <footer>- Romans 10:9 - 10, 13</footer>
          </Blockquote>

          <Text>
            Right now, bow your head and repeat this prayer to God, sincerely
            meaning it in your heart.
          </Text>

          <Blockquote>
            Dear God, I admit that I'm a sinner and I deserve to pay for my
            sins. I believe that Jesus died for me, and right now I receive the
            Lord Jesus into my heart as my personal Savior. Take away my sin and
            take me to Heaven when I die. In Jesus' name, Amen.
          </Blockquote>

          <Text css={{marginBottom: 50}}>Did you pray that prayer?</Text>

          <ButtonLink
            href="https://bit.ly/35KxN7M"
            rel="noopener noreferrer"
            target="_blank"
            text="Let Us Know!"
          />
        </SalvationContainer>
      </Section>
    </Layout>
  )
}

const SalvationContainer = styled.div`
  margin-top: 100px;
  max-width: 75%;
  width: 100%;
  margin-bottom: 500px;

  @media screen and (max-width: 735px) {
    max-width: 100%;
  }
`

const color = (p) => css`
  color: ${p.theme.colors.primary};
`

const Text = styled.p`
  ${color}
`

export default Salvation
