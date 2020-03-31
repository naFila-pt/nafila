import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import * as S from "./style";
import AddConsumerPhoneSuccess from "./AddConsumerPhoneSuccess";
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

function AddConsumerPhone(props) {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const [phone, setPhone] = useState("")
  const [success, setSuccess] = useState(false);
  console.log(props);

  const phoneTextChanging = e => {
    setPhone(e.target.value);
  };

  const generateTicket = () => {
    console.log("WRITE GENERATE TICKET LOGIC FOR SUBMITING PHONE NUMBER");
    setSuccess(true);
  };

  if (success) return <AddConsumerPhoneSuccess />;

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
          style={{ marginTop: "15vh" }}
          {...inputProps}
        />

        <ButtonsContainer>
          <Button onClick={generateTicket}>
            {t("main#addConsumer_generateTicket")}
          </Button>

          <Button variant="gray" onClick={props.returnFunction} backward>
            {t("main#addConsumer_back")}
          </Button>
        </ButtonsContainer>
      </S.Form>
    </Layout>
  );
}

export default AddConsumerPhone;
