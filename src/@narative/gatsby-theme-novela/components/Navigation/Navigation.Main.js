import React, {useState} from 'react'
import {Link} from 'gatsby'
import styled from '@emotion/styled'

const NavigationMain = ({footer = false}) => {
  const [showMenu, setShowMenu] = useState(false)

  const navigationItems = (
    <NavigationList>
      {footer && (
        <NavigationItem>
          <Link to="/">Home</Link>
        </NavigationItem>
      )}

      <NavigationItem>
        <Link to="/salvation">Salvation</Link>
      </NavigationItem>
    </NavigationList>
  )

  const headerNavigation = (
    <NavigationContainer>{navigationItems}</NavigationContainer>
  )

  const footerNavigation = (
    <MobileNavigationContainer>
      {showMenu && navigationItems}

      <NavigationMobileLink onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? 'Hide' : 'Show'} Menu
      </NavigationMobileLink>
    </MobileNavigationContainer>
  )

  return footer ? footerNavigation : headerNavigation
}

const NavigationContainer = styled.div`
  width: 100%;
  margin-left: 30px;
  border-left: 1px solid #d8d8db;

  @media screen and (max-width: 735px) {
    display: none;
  }
`

const MobileNavigationContainer = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  position: fixed;
  background-color: #fafafa;
  border-top-left-radius: 40px;
  border-top: 1px solid #d8d8db;
  border-top-right-radius: 40px;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 736px) {
    display: none;
  }
`

const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const NavigationItem = styled.li`
  display: inline-block;

  > a {
    color: #000;
    margin: 0 5px;
    padding: 10px 15px 5px;

    &:hover {
      color: #6166dc;
    }
  }

  @media screen and (max-width: 735px) {
    width: 100%;
    display: block;
    border-bottom: 1px solid #d8d8db;

    > a {
      display: block;
      padding: 20px 0;
      text-align: center;
    }
  }
`

const NavigationMobileLink = styled.div`
  color: #000;
  display: none;
  padding: 20px 0;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #6166dc;
  }

  @media screen and (max-width: 735px) {
    display: block;
  }
`

export default NavigationMain
