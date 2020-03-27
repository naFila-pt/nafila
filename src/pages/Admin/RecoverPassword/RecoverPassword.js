import React, { useState } from 'react'

import { Typography, TextField} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/user_main.svg'
import Logo from '../../../assets/logo.svg'
import Layout from '../Layout'
import { PRIMARY_COLOR, WHITE_COLOR } from '../../../constants/ColorConstants'
import { ADMIN_LOGIN_PATH, ADMIN_SIGNUP_PATH } from '../../../constants/RoutesConstants'
import * as S from './style'

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: '2rem'
  }
}

const buttonStyles = {
    color: WHITE_COLOR,
    textDecoration: 'none',
    background: 'none'
}

const inputProps = {
  fullWidth: true,
  required: true,
}

function RecoverPassword() {
  const { t } = useTranslation()
  const [fields, setFields] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setFields({
      ...fields,
      [name]: value
    })
  }

  return (
    <Layout bg={LoginBg}>
        <S.Form>
            <Typography variant="h3" style={typographyStyles.TITLE}>
              {t("admin#login_title")}
            </Typography>

            <TextField
              label={t('admin#login_email')}
              name="email"
              onChange={e => handleChange(e)}
              style={{marginTop: '25px'}}
              {...inputProps}
            />

            <TextField
              label={t('admin#login_password')}
              type="password"
              name="password"
              onChange={e => handleChange(e)}
              min="6"
              style={{marginTop: '25px'}}
              {...inputProps}
            />

            <S.RecoverLink>
            <Link to={ADMIN_LOGIN_PATH} style={{ color: WHITE_COLOR, textDecoration: 'none' }}>
                {t('admin#login_recover_password')}
                </Link>
            </S.RecoverLink>

            <Button forward style={buttonStyles}>
                {t('admin#intro_login')}
            </Button>
        </S.Form>
    </Layout>
  )
}

export default RecoverPassword
