import React, { useState } from 'react'

import { Typography, TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button'
import LoginBg from '../../../assets/bg/main.svg'
import Layout from '../Layout'
import { PRIMARY_COLOR, WHITE_COLOR, BACK_BUTTON_BG_COLOR, BACK_BUTTON_TEXT_COLOR } from '../../../constants/ColorConstants'
import * as S from './style'
import AddConsumerPhoneSuccess from './AddConsumerPhoneSuccess'
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

function AddConsumerPhone(props) {
    const { t } = useTranslation()
    const [phone, setPhone] = useState("")
    const [success, setSuccess] = useState(false)
    console.log(props)

    const phoneTextChanging = (e) => {
        setPhone(e.target.value);
    }

    const generateTicket = () => {
        console.log("WRITE GENERATE TICKET LOGIC FOR SUBMITING PHONE NUMBER");
        setSuccess(true)


    }

    if (success) return <AddConsumerPhoneSuccess />

    return (
        <Layout bg={LoginBg}>
            <S.Form>
                <Typography variant="h3" style={typographyStyles.TITLE}>
                    {t("main#addConsumerPhone_title")}
                </Typography>

                <TextField
                    label={t("main#addConsumerPhone_placeholder")}
                    name="phone"
                    onChange={e => phoneTextChanging(e)}
                    style={{ marginTop: '25px' }}
                    {...inputProps}
                />


                <Button forward style={buttonStyles} onClick={generateTicket} >
                    {t("main#addConsumer_generateTicket")}

                </Button>


                <Button backward style={backButtonStyles} onClick={props.returnFunction}>

                    {t("main#addConsumer_back")}

                </Button>
            </S.Form>
        </Layout>
    )
}

export default AddConsumerPhone
