import React, { useState } from "react";

import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import {
  PRIMARY_COLOR,
  WHITE_COLOR,
  BACK_BUTTON_BG_COLOR,
  BACK_BUTTON_TEXT_COLOR
} from "../../../constants/ColorConstants";
import * as S from "./style";
import AddConsumerName from "./AddConsumerName";
import AddConsumerPhone from "./AddConsumerPhone";

import { ReactComponent as Logo } from "../../../assets/logo.svg";

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

function AddConsumer() {
  const { t } = useTranslation();

  const [viewType, setViewType] = useState("");

  const returnToThisViewFunction = () => {
    setViewType("");
  };

  if (viewType === "phone") {
    return <AddConsumerPhone returnFunction={returnToThisViewFunction} />;
  } else if (viewType === "name") {
    return <AddConsumerName returnFunction={returnToThisViewFunction} />;
  }

  return (
    <Layout bg={LoginBg}>
      <S.Form>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("main#addConsumer_title")}
        </Typography>
        <div style={{ textAlign: "center" }}>
          <Logo />
        </div>
        <Button
          forward
          style={buttonStyles}
          onClick={() => setViewType("phone")}
        >
          {t("main#addConsumer_button1")}
        </Button>

        <Button
          forward
          style={buttonStyles}
          onClick={() => setViewType("name")}
        >
          {t("main#addConsumer_button2")}
        </Button>

        <Button backward style={backButtonStyles}>
          {t("main#addConsumer_back")}
        </Button>
      </S.Form>
    </Layout>
  );
}

export default AddConsumer;