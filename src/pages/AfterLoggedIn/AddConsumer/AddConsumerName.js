import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

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
import AddConsumerNameSuccess from "./AddConsumerNameSuccess";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};
const inputProps = {
  fullWidth: true,
  required: true
};
const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  left: 0;

  .MuiButtonBase-root {
    margin-bottom: 20px;
  }
`;

function AddConsumerName(props) {
  const { t } = useTranslation();
  // eslint-disable-next-line
    const [name, setName] = useState("")
  const [success, setSuccess] = useState(false);

  const nameTextChanging = e => {
    setName(e.target.value);
  };

  const generateTicket = () => {
    console.log("WRITE GENERATE TICKET LOGIC FOR SUBMITING NAME");
    setSuccess(true);
  };

  if (success) return <AddConsumerNameSuccess />;

  return (
    <Layout bg={LoginBg}>
      <S.Form>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("main#addConsumerName_title")}
        </Typography>

        <TextField
          label={t("main#addConsumerName_placeholder")}
          name="name"
          onChange={e => nameTextChanging(e)}
          style={{ marginTop: "15vh" }}
          {...inputProps}
        />

        <ButtonsContainer>
          <Button onClick={generateTicket}>
            {t("main#addConsumer_generateTicket")}
          </Button>

          <Button backward variant="gray" onClick={props.returnFunction}>
            {t("main#addConsumer_back")}
          </Button>
        </ButtonsContainer>
      </S.Form>
    </Layout>
  );
}

export default AddConsumerName;
