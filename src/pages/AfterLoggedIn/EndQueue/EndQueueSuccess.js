import React from "react";

import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import {
    PRIMARY_COLOR,
    BACK_BUTTON_BG_COLOR,
    BACK_BUTTON_TEXT_COLOR
} from "../../../constants/ColorConstants";
import Logo from "../../../assets/logo.svg";
import * as S from "./style";
const typographyStyles = {
    TITLE: {
        color: PRIMARY_COLOR,
        fontWeight: 900,
        fontSize: "2rem"
    }
};

const backButtonStyles = {
    color: BACK_BUTTON_TEXT_COLOR,
    textDecoration: "none",
    background: BACK_BUTTON_BG_COLOR
};

function EndQueueSuccess() {
    const { t } = useTranslation();



    return (
        <Layout bg={LoginBg}>
            <S.Form>
                <Typography variant="h3" style={typographyStyles.TITLE}>
                    {t("main#endQueueSuccess_title")}
                </Typography>

                <p
                    style={typographyStyles.SECONDARY}
                    dangerouslySetInnerHTML={{
                        __html: t("main#endQueueSuccess_text")
                    }}
                />

                <S.LogoContainer>
                    <img src={Logo} alt="nafila logo" />
                </S.LogoContainer>

                <Button backward style={backButtonStyles}>
                    <Link
                        to={"/notImplemented"}
                        style={{
                            color: BACK_BUTTON_TEXT_COLOR,
                            textDecoration: "none",
                            background: BACK_BUTTON_BG_COLOR
                        }}
                    >
                        {t("main#endQueueSuccess_back")}
                    </Link>
                </Button>
            </S.Form>
        </Layout>
    );
}

export default EndQueueSuccess;