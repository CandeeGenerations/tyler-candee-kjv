import React, {useState} from 'react'
import {css} from '@emotion/core'
import styled from '@emotion/styled'

import Section from '@narative/gatsby-theme-novela/src/components/Section'

const NavigationMain = ({location}) => {
  const [showMenu, setShowMenu] = useState(!window || window.innerWidth > 735)

  const home = location && location.pathname === '/'
  const salvation = location && location.salvation

  const activeItem = css`
    font-weight: bold;
    border-bottom: 2px solid #d8d8db;

    @media screen and (max-width: 735px) {
      border-bottom: 0;
    }
  `

  return (
    <Section
      relative
      css={css`
        margin-top: 50px;
        padding: 20px 4rem;
        border-top: 1px solid #d8d8db;
        border-bottom: 1px solid #d8d8db;

        @media screen and (max-width: 735px) {
          padding: 20px 0;
        }
      `}
    >
      <NavigationMobileLink onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? 'Hide' : 'Show'} Menu
      </NavigationMobileLink>

      {showMenu && (
        <NavigationList>
          <NavigationItem>
            <a href="/" css={home && activeItem}>
              Home
            </a>
          </NavigationItem>

          <NavigationItem>
            <a href="/salvation" css={salvation && activeItem}>
              Salvation
            </a>
          </NavigationItem>
        </NavigationList>
      )}
    </Section>
  )
}

const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const NavigationItem = styled.li`
  display: inline-block;

  > a {
    margin: 0 5px;
    color: #6166dc;
    padding: 10px 15px 5px;
  }

  @media screen and (max-width: 735px) {
    width: 100%;
    display: block;

    &:not(:last-child) {
      border-bottom: 1px solid #d8d8db;

      > a {
        padding: 20px 0;
      }
    }

    > a {
      display: block;
      padding-top: 20px;
      text-align: center;
    }
  }
`

const NavigationMobileLink = styled.div`
  display: none;
  color: #6166dc;
  padding: 20px 0;
  cursor: pointer;
  text-align: center;

  @media screen and (max-width: 735px) {
    display: block;
  }
`

export default NavigationMain
