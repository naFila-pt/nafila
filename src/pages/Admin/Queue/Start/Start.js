import React, { useState } from "react";
import { Typography, Grid, Box } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Layout from "../../../../components/AdminLayout";
import Button from "../../../../components/Button";
import Bg from "../../../../assets/bg/home_desktop.svg";
import redGirl from "../../../../assets/icons/girl_red.svg";
import pregnantGirl from "../../../../assets/icons/girl_pregnant.svg";
import { auth, functions, analytics } from "../../../../firebase";

import { PRIMARY_COLOR } from "../../../../constants/ColorConstants";

const ContainerWrapper = styled(Grid)`
  display: flex;
  padding: 0 5%;
  height: calc(100vh - 64px);
  justify-content: center;
  align-items: center;
`;

const AssetsContainer = styled(Grid)`
  display: flex;
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90%;
`;

const StoreName = styled.div`
  margin-top: 50px;
  h4 {
    font-weight: 700;
    padding: 10px 0;
  }

  .MuiInput-root {
    width: 100%;
  }

  .MuiInput-input {
    text-align: center;
  }
`;

const CapacityNumber = styled(Grid)`
  h4 {
    font-weight: 700;
    padding: 10px 0;
  }

  .MuiInput-root {
    width: 100%;
  }

  .MuiInput-input {
    text-align: center;
  }
`;

const HelperLabel = styled.div`
  padding: 10px 0;
  font-size: 13px;
`;

const EmailWithCode = styled.p`
  margin-top: 30px;
  font-size: 1.25em;
  text-align: start;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
`;

function Start({ user, setQueue, openSnackbar }) {
  const [requesting, setRequesting] = useState(false);
  const [capacity, setCapacity] = useState(2);
  const [defaultQueueName, setDefaultQueueName] = useState(
    user.defaultQueueName
  );
  const { t } = useTranslation();

  const handleChange = event => {
    setDefaultQueueName(event.target.value);
  };

  const startQueue = () => {
    setRequesting(true);
    const createQueue = functions.httpsCallable("createQueue");

    createQueue({
      name: defaultQueueName,
      email: auth.currentUser.email,
      maxCapacity: capacity
    })
      .then(({ data: { queueId } }) => {
        analytics.logEvent("queue");
        setQueue(queueId);
      })
      .catch(e => {
        setRequesting(false);
        openSnackbar(e.message);
      });
  };

  return (
    <Layout bg={Bg}>
      <ContainerWrapper container>
        <FormWrapper sm={5} xs={12}>
          <Typography variant="h3" align="left">
            {t("admin#queueManagement_letsStart")}
          </Typography>
          <StoreName className="start-queue-store">
            <Input
              value={defaultQueueName}
              onChange={handleChange}
              inputProps={{ maxLength: 20 }}
            />
            <HelperLabel>{t("admin#queueManagement_queueName")}</HelperLabel>
          </StoreName>

          <CapacityNumber>
            <Input
              value={capacity}
              onChange={e => {
                const value = e.target.validity.valid
                  ? e.target.value
                  : capacity;
                setCapacity(value);
              }}
              inputProps={{ type: "number" }}
            />
            <HelperLabel>
              {t("admin#queueManagement_storeCapacity")}
            </HelperLabel>
          </CapacityNumber>

          <EmailWithCode
            dangerouslySetInnerHTML={{
              __html: t("admin#queueManagement_emailWithCode")
            }}
          />

          <ButtonContainer>
            <Button
              onClick={() => startQueue()}
              disabled={requesting}
              variant={requesting ? "inactive" : ""}
            >
              {requesting
                ? t("admin#queueManagement_creatingQueue")
                : t("admin#queueManagement_startQueue")}
            </Button>
          </ButtonContainer>
        </FormWrapper>
        <AssetsContainer sm={7}>
          <Grid style={{ display: "flex", width: "100%", height: "100%" }}>
            <Box width="50%" height="100%" display="flex" alignItems="end">
              <img src={redGirl} alt="girl red" height="90%" width="100%" />
            </Box>
            <Box width="50%" height="100%" display="flex" alignItems="start">
              <img
                src={pregnantGirl}
                alt="pregnant girl"
                height="90%"
                width="100%"
              />
            </Box>
          </Grid>
        </AssetsContainer>
      </ContainerWrapper>
    </Layout>
  );
}

export default Start;
