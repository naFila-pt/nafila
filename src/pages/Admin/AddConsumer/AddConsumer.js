import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import { auth, firestore } from "../../../firebase";
import { ReactComponent as Logo } from "../../../assets/logo.svg";

import { HeadlineContainer, ButtonsContainer } from "../common";

import AddConsumerName from "./AddConsumerName";
import AddConsumerPhone from "./AddConsumerPhone";

function AddConsumer() {
  const { t } = useTranslation();

  const [viewType, setViewType] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const availableViews = {
    PHONE: (
      <AddConsumerPhone user={user} returnFunction={() => setViewType()} />
    ),
    NAME: <AddConsumerName user={user} returnFunction={() => setViewType()} />
  };

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(response => {
        const user = response.data();
        setUser(user);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (viewType) return availableViews[viewType];

  return (
    <Layout bg={LoginBg}>
      <HeadlineContainer style={{ marginBottom: 0 }}>
        <Typography variant="h3">{t("main#addConsumer_title")}</Typography>
      </HeadlineContainer>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Logo style={{ height: "200px" }} />
      </div>

      <ButtonsContainer>
        <Button forward onClick={() => setViewType("PHONE")}>
          {t("main#addConsumer_byPhone")}
        </Button>

        <Button forward onClick={() => setViewType("NAME")}>
          {t("main#addConsumer_byName")}
        </Button>

        <Button
          variant="gray"
          style={{ marginTop: 50 }}
          href={ADMIN_QUEUE_MANAGEMENT_PATH}
          backward
        >
          {t("main#addConsumer_back")}
        </Button>
      </ButtonsContainer>
    </Layout>
  );
}

export default AddConsumer;
