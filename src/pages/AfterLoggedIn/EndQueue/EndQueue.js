import React, { useState } from "react";

import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import {
    PRIMARY_COLOR,
    WHITE_COLOR,
    BACK_BUTTON_BG_COLOR,
    BACK_BUTTON_TEXT_COLOR
} from "../../../constants/ColorConstants";
import Logo from "../../../assets/logo.svg";
import * as S from "./style";
import EndQueueSuccess from "./EndQueueSuccess";

const typographyStyles = {
    TITLE: {
        color: PRIMARY_COLOR,
        fontWeight: 900,
        fontSize: "2rem"
    }
};

const buttonStyles = {
    color: WHITE_COLOR,
    textDecoration: "none",
    background: "none"
};
const backButtonStyles = {
    color: BACK_BUTTON_TEXT_COLOR,
    textDecoration: "none",
    background: BACK_BUTTON_BG_COLOR
};

const inputProps = {
    fullWidth: true,
    required: true
};

function EndQueue() {
    const { t } = useTranslation();
    const [success, setSuccess] = useState(false)

    const confirmEndQueueButton = () => {
        console.log("NEEDS API CALL TO END QUEUE");
        setSuccess(true)

    }

    if (success) return <EndQueueSuccess />;

    return (
        <Layout bg={LoginBg}>
            <S.Form>
                <Typography variant="h3" style={typographyStyles.TITLE}>
                    {t("main#endQueue_title")}
                </Typography>
                <S.LogoContainer>
                    <img src={Logo} alt="nafila logo" />
                </S.LogoContainer>


                <Button style={buttonStyles} onClick={confirmEndQueueButton}>
                    {t("main#endQueue_yes")}
                </Button>

                <Button forward style={backButtonStyles}>
                    <Link
                        to={"/notImplemented"}
                        style={{
                            color: BACK_BUTTON_TEXT_COLOR,
                            textDecoration: "none",
                            background: BACK_BUTTON_BG_COLOR
                        }}
                    >
                        {t("main#endQueue_no")}
                    </Link>
                </Button>
            </S.Form>
        </Layout>
    );
}

export default EndQueue;