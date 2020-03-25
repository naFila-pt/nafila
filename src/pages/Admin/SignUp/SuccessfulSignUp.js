import React from 'react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Layout from '../Layout'
import Button from '../../../components/Button'
import SignUpBg from '../../../assets/bg/user_main.svg'
import { ADMIN_LOGIN_PATH } from '../../../constants/RoutesConstants'

const Container = styled.div`
  padding: 20vh 20px 0;

  .MuiButton-root {
    position: absolute !important;
    bottom: 30px !important;
    width: 90%;
    left: 5%;
  }
`

const typographyStyles = {
  MAIN: {
    fontSize: '1.8em',
    fontWeight: 900,
  },
  SECONDARY: {
    fontSize: '1.3em'
  }
}

function SuccessfulSignUp() {
  const { t } = useTranslation()

  return (
    <Layout bg={SignUpBg}>
      <Container>
        <Typography style={typographyStyles.MAIN}>
          {t('admin#signup_successTitle')}
        </Typography>

        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{ __html: t('admin#signup_successHeroText') }}
        />

        <Button href={ADMIN_LOGIN_PATH} variant="secondary" backward>
          {t('global#return_button')}
        </Button>
      </Container>
    </Layout>
  )
}

export default SuccessfulSignUp
