import React from 'react'
import { Box } from '@material-ui/core'
import styled from 'styled-components'

import LogoImage from '../../../assets/logo-mini.svg'

const Logo = styled.img`
  padding: 50px 0;
  display: block;
  margin: 0 auto;
`

function Layout({ children, bg, hideToolbar }) {
  const boxProps = {
    width: 1,
    height: 1,
    style: {
      background: `url(${bg})`,
      textAlign: 'center'
    }
  }

  return (
    <Box {...boxProps}>
      {!hideToolbar && <Logo src={LogoImage} />}
      {children}
    </Box>
  )
}

export default Layout
