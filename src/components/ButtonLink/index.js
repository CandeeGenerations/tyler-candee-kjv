import React from 'react'
import styled from '@emotion/styled'

const ButtonLink = ({href, text}) => {
  return <StyledLink href={href}>{text}</StyledLink>
}

export default ButtonLink

const StyledLink = styled.a`
  color: ${(p) => p.theme.colors.background};
  padding: 15px 40px;
  border-radius: 2px;
  background-color: ${(p) => p.theme.colors.primary};
`
