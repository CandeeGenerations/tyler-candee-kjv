import React from 'react'
import {Link} from 'gatsby'
import styled from '@emotion/styled'

const ButtonLink = ({href, text, ...rest}) => {
  let Component = StyledLink
  let options = {}

  if (href) {
    Component = StyledA
    options = {href}
  }

  return (
    <Component {...options} {...rest}>
      {text}
    </Component>
  )
}

export default ButtonLink

const StyledA = styled.a`
  color: ${(p) => p.theme.colors.background};
  padding: 15px 40px;
  border-radius: 2px;
  background-color: ${(p) => p.theme.colors.primary};
`

const StyledLink = styled(Link)`
  color: ${(p) => p.theme.colors.background};
  padding: 15px 40px;
  border-radius: 2px;
  background-color: ${(p) => p.theme.colors.primary};
`
