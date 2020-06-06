import React, { useState, useEffect } from "react";
import { Typography, Grid, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Hd from "../../../assets/bg/home_desktop.svg";
import Layout from "../../../components/AdminLayout";
import Footer from "../../../components/Footer";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import Logo from "../../../assets/logo.svg";
import { firestore, auth, functions, analytics } from "../../../firebase";

import { HeadlineContainer } from "../common";

import EndQueueSuccess from "./EndQueueSuccess";

import TitleComponent from "../../../components/TitleComponent";

import Girl from "../../../assets/icons/rapariga.svg";
import Girl2 from "../../../assets/icons/rapariga2.svg";
import Store from "../../../assets/images/ilust_loja.svg";

const EndQueueGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

const ButtonGroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;

  .MuiButtonWrapper {
    margin-bottom: 20px;
  }
`;

const FooterWrapper = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const ImagesWrapper = styled(Grid)`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

function EndQueue({ openSnackbar }) {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const confirmEndQueueButton = () => {
    setRequesting(true);

    const deleteQueue = functions.httpsCallable("deleteQueue");

    deleteQueue({ queueId: user.queues[0] })
      .then(async function ({ data: { deletedCount, totalTickets } }) {
        analytics.logEvent("queue_closed");
        analytics.logEvent("queue_tickets", { value: totalTickets });
        analytics.logEvent("queue_tickets_force_closed", {
          value: deletedCount
        });
        //TO-DO: analytics.logEvent("queue_tickets_cancelled", {value}); //requires data schema/flow change of keeping track of old tickets
        //TO-DO: analytics.logEvent("queue_tickets_called", {value}); //requires data schema/flow change of keeping track of old tickets

        setSuccess(true);
      })
      .catch(error => {
        setRequesting(false);
        openSnackbar(error.message);
      });
  };

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(response => {
        const user = response.data();

        if (!user.queues[0])
          return (window.location.href = ADMIN_QUEUE_MANAGEMENT_PATH);

        setUser(user);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (success) return <EndQueueSuccess />;

  return (
    <Layout bg={Hd}>
      <TitleComponent title="Encerrar fila" pageId="close_queue" />
      <Box display="flex" flex="1">
        <EndQueueGrid item xs={12} sm={5}>
          <HeadlineContainer>
            <Typography variant="h3">{t("main#endQueue_title")}</Typography>
          </HeadlineContainer>

          <img
            src={Logo}
            className="logo-icon logo-icon-end-queue"
            alt="nafila logo"
          />

          <ButtonGroupWrapper>
            <div>
              <Button
                onClick={confirmEndQueueButton}
                disabled={requesting}
                variant={requesting ? "inactive" : ""}
                forward
              >
                {t("main#endQueue_yes")}
              </Button>
            </div>

            <div>
              <Button
                variant={requesting ? "inactiveGray" : "gray"}
                href={ADMIN_QUEUE_MANAGEMENT_PATH}
                forward
              >
                {t("main#endQueue_no")}
              </Button>
            </div>
          </ButtonGroupWrapper>
        </EndQueueGrid>
        <ImagesWrapper item xs={12} sm={7}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              marginLeft: "-15em"
            }}
          >
            <img style={{ marginBottom: "-7em" }} src={Girl2} alt="girl2" />
            <img src={Girl} alt="girl" />
            <img src={Store} alt="store" />
          </div>
        </ImagesWrapper>
      </Box>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Layout>
  );
}

export default EndQueue;
