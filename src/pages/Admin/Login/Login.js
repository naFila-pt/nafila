import React from 'react'

import { Typography } from '@material-ui/core'
import Input from '@material-ui/core/Input';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/user_main.svg'
import Logo from '../../../assets/logo.svg'
import Layout from '../Layout'
import { PRIMARY_COLOR, WHITE_COLOR } from '../../../constants/ColorConstants'

import * as S from './style'

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: '2rem'
  }
}

function Login() {
  const { t } = useTranslation()
  return (
    <Layout bg={LoginBg}>
        <S.ContentContainer>
            <Typography variant="h3" style={typographyStyles.TITLE}>
              {t("admin#login_title")}
            </Typography>

            <Input placeholder={t('admin#login_email')} style={{ width: '100%' }} />

            <Input placeholder={t('admin#login_password')} style={{ width: '100%' }} />

            <a>{t('admin#login_recover_password')}</a>

            <Button forward style={{ color: WHITE_COLOR, textDecoration: 'none' }}>
                {t('admin#intro_login')}
            </Button>
        </S.ContentContainer>
    </Layout>
  )
}

export default Login
