import React, { useState, useRef } from 'react'

import { Typography, TextField } from '@material-ui/core'
import Input from '@material-ui/core/Input';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/user_main.svg'
import Logo from '../../../assets/logo.svg'
import Layout from '../Layout'
import { PRIMARY_COLOR, WHITE_COLOR, BACK_BUTTON_BG_COLOR, BACK_BUTTON_TEXT_COLOR } from '../../../constants/ColorConstants'
import * as S from './style'
import { useLocation } from "react-router";
import { ADMIN_LOGIN_PATH } from '../../../constants/RoutesConstants'

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
const backButtonStyles = {
  color: BACK_BUTTON_TEXT_COLOR,
  textDecoration: 'none',
  background: BACK_BUTTON_BG_COLOR
}

const inputProps = {
  fullWidth: true,
  required: true,
}



function RecoverPasswordChangeSuccess(props) {
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
          {t("admin#recoverPasswordChangeSuccess_title")}
        </Typography>

        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{ __html: t('admin#recoverPasswordChangeSuccess_text1') }}
        />




        <Button forward style={buttonStyles}>
          <Link to={ADMIN_LOGIN_PATH} >
            {t('admin#recoverPasswordChangeSuccess_button')}
          </Link>
        </Button>
      </S.Form>
    </Layout>
  )
}

export default RecoverPasswordChangeSuccess
