import React, { useState } from 'react'

import { Typography, TextField} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/user_main.svg'
import Logo from '../../../assets/logo.svg'
import Layout from '../Layout'
import { PRIMARY_COLOR, WHITE_COLOR, BACK_BUTTON_BG_COLOR , BACK_BUTTON_TEXT_COLOR} from '../../../constants/ColorConstants'
import { ADMIN_RECOVERPASSWORDSUCCESS_PATH, ADMIN_LOGIN_PATH } from '../../../constants/RoutesConstants'
import * as S from './style'
import SuccessfulRecoverPassword from './SuccessfulRecoverPassword'
import validator from "email-validator"
import authentication from "../../../services/authentication"
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





function RecoverPassword() {
  const { t } = useTranslation()
  const [fields, setFields] = useState()
  const [success, setSuccess] = useState(false)
  const [email,setEmail] = useState("")
  const [wrongEmailText, setWrongEmailText] = useState("") 
  const handleChange = ({ target: { name, value } }) => {
    setFields({
      ...fields,
      [name]: value
    })
  }

  const sendPasswordRecoveryEmail = ( ) => {
    if (validator.validate(email)){
      authentication.resetPassword(email);
      setSuccess(true)}
    else{
      setWrongEmailText(t("admin#recoverPassword_wrongEmail"))

    }
  }

  const changeEmailText= (v) =>{
    setEmail(v);
    setWrongEmailText("");
  }


  if (success) return <SuccessfulRecoverPassword email={email}/>;

  return (
    <Layout bg={LoginBg}>
        <S.Form>
            <Typography variant="h3" style={typographyStyles.TITLE}>
              {t("admin#recoverPassword_title")}
            </Typography>

            <TextField
              label={t('admin#recoverPassword_email')}
              name="email"
              onChange={e => changeEmailText(e.target.value)}
              style={{marginTop: '25px'}}
              {...inputProps}
            />
             <Typography variant="h5" style={{color:'red'}}>
              {wrongEmailText}
            </Typography>
           

            <Button style={buttonStyles} onClick={sendPasswordRecoveryEmail}>
                {t('admin#recoverPassword_recover')}
                
            </Button>

            <Button backward style={backButtonStyles}>
              <Link to={ADMIN_LOGIN_PATH}style={{ color: BACK_BUTTON_TEXT_COLOR, textDecoration: 'none' , background: BACK_BUTTON_BG_COLOR}} >
                {t('admin#recoverPassword_back')}
                </Link>
            </Button>
        </S.Form>
    </Layout>
  )
}

export default RecoverPassword
