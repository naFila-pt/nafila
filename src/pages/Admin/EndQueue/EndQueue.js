import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Bg from "../../../assets/bg/store_queue_end.svg";
import Layout from "../../../components/AdminLayout";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import Logo from "../../../assets/logo.svg";
import { firestore, auth, functions } from "../../../firebase";

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
  marginTop: 20
};

function EndQueue() {
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
      <Typography variant="h3" style={typographyStyles.TITLE}>
        {t("main#endQueue_title")}
      </Typography>
      <S.LogoContainer>
        <img src={Logo} alt="nafila logo" />
      </S.LogoContainer>

      <Button
        style={buttonStyles}
        onClick={confirmEndQueueButton}
        disabled={requesting}
        variant={requesting ? "inactive" : ""}
      >
        {t("main#endQueue_yes")}
      </Button>

      <Button
        variant={requesting ? "inactive" : "gray"}
        href={ADMIN_QUEUE_MANAGEMENT_PATH}
        style={buttonStyles}
        forward
      >
        {t("main#endQueue_no")}
      </Button>
    </Layout>
  );
}

export default EndQueue;
