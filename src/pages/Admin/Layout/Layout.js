import React from 'react'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Logo = styled.div`
  font-size: 32px;
  padding: 35px 0;
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
  const { t } = useTranslation()

  return (
    <Box {...boxProps}>
      {!hideToolbar && <Logo dangerouslySetInnerHTML={{ __html: t('appTitle') }} />}
      {children}
    </Box>
  )
}

export default Layout
