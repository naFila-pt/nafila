import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Bg from "../../../assets/bg/store_queue_end.svg";
import Layout from "../../../components/AdminLayout";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import Logo from "../../../assets/logo.svg";
import { firestore, auth, functions } from "../../../firebase";

import { HeadlineContainer, ButtonsContainer } from "../common";

import EndQueueSuccess from "./EndQueueSuccess";

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
      .then(async function({ data: { ticket } }) {
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
    <Layout bg={Bg}>
      <HeadlineContainer>
        <Typography variant="h3">{t("main#endQueue_title")}</Typography>
      </HeadlineContainer>

      <img src={Logo} className="logo-icon" alt="nafila logo" />

      <ButtonsContainer>
        <div>
          <Button
            onClick={confirmEndQueueButton}
            disabled={requesting}
            variant={requesting ? "inactive" : ""}
          >
            {t("main#endQueue_yes")}
          </Button>
        </div>

        <div>
          <Button
            variant={requesting ? "inactiveGray" : "gray"}
            href={ADMIN_QUEUE_MANAGEMENT_PATH}
          >
            {t("main#endQueue_no")}
          </Button>
        </div>
      </ButtonsContainer>
    </Layout>
  );
}

export default EndQueue;
