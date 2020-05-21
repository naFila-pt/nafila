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

import TitleComponent from "../../../components/TitleComponent";

function AddConsumer({ openSnackbar }) {
  const { t } = useTranslation();

  const [viewType, setViewType] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const availableViews = {
    PHONE: (
      <AddConsumerPhone
        openSnackbar={openSnackbar}
        user={user}
        returnFunction={() => setViewType()}
      />
    ),
    NAME: (
      <AddConsumerName
        openSnackbar={openSnackbar}
        user={user}
        returnFunction={() => setViewType()}
      />
    )
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
      <TitleComponent title="Senha manual" />
      <HeadlineContainer style={{ marginBottom: 0 }}>
        <Typography variant="h3">{t("main#addConsumer_title")}</Typography>
      </HeadlineContainer>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Logo className="logo-icon hide-on-small" style={{ height: "200px" }} />
      </div>

      <ButtonsContainer>
        <div>
          <Button forward onClick={() => setViewType("PHONE")}>
            {t("main#addConsumer_byPhone")}
          </Button>
        </div>

        <div>
          <Button forward onClick={() => setViewType("NAME")}>
            {t("main#addConsumer_byName")}
          </Button>
        </div>

        <div>
          <Button
            variant="gray"
            style={{ marginTop: "3.13em" }}
            href={ADMIN_QUEUE_MANAGEMENT_PATH}
            backward
          >
            {t("main#addConsumer_back")}
          </Button>
        </div>
      </ButtonsContainer>
    </Layout>
  );
}

export default AddConsumer;
