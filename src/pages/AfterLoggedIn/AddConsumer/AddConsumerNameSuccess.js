import React, { useState } from 'react'

import { Typography, TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/main.svg'
import Layout from '../Layout'
import { PRIMARY_COLOR, WHITE_COLOR, BACK_BUTTON_BG_COLOR, BACK_BUTTON_TEXT_COLOR } from '../../../constants/ColorConstants'
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





function AddConsumerNameSuccess() {
    const { t } = useTranslation()



    return (
        <Layout bg={LoginBg}>
            <S.Form>
                <Typography variant="h3" style={typographyStyles.TITLE}>
                    {t("main#addConsumerSuccess_title")}
                </Typography>


                <p
                    style={typographyStyles.SECONDARY}
                    dangerouslySetInnerHTML={{ __html: t('main#addConsumerNameSuccess_text') }}
                />

                <Button forward style={buttonStyles} >
                    {t("main#addConsumerSuccess_button")}
                </Button>

            </S.Form>
        </Layout>
    )
}

export default AddConsumerNameSuccess
