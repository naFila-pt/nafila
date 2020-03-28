import React from 'react'

import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/main.svg'
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

const buttonStyles = {
    color: WHITE_COLOR,
    textDecoration: 'none',
    background: 'none'
}



function AddConsumerPhoneSuccess() {
    const { t } = useTranslation()

    return (
        <Layout bg={LoginBg}>
            <S.Form>
                <Typography variant="h3" style={typographyStyles.TITLE}>
                    {t("main#addConsumerSuccess_title")}
                </Typography>

                <p
                    style={typographyStyles.SECONDARY}
                    dangerouslySetInnerHTML={{ __html: t('main#addConsumerPhoneSuccess_text') }}
                />

                <Button forward style={buttonStyles} >
                    {t("main#addConsumerSuccess_button")}
                </Button>

            </S.Form>
        </Layout>
    )
}

export default AddConsumerPhoneSuccess
