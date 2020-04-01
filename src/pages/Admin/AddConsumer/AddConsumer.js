import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import { auth, firestore } from "../../../firebase";
import { ReactComponent as Logo } from "../../../assets/logo.svg";

import AddConsumerName from "./AddConsumerName";
import AddConsumerPhone from "./AddConsumerPhone";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};

const buttonStyles = {
  marginBottom: 20
};
const backButtonStyles = {
  marginTop: 80
};

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
      <Typography variant="h3" style={typographyStyles.TITLE}>
        {t("main#addConsumer_title")}
      </Typography>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Logo />
      </div>

      <Button forward style={buttonStyles} onClick={() => setViewType("PHONE")}>
        {t("main#addConsumer_byPhone")}
      </Button>

      <Button forward style={buttonStyles} onClick={() => setViewType("NAME")}>
        {t("main#addConsumer_byName")}
      </Button>

      <Button
        variant="gray"
        style={backButtonStyles}
        href={ADMIN_QUEUE_MANAGEMENT_PATH}
        backward
      >
        {t("main#addConsumer_back")}
      </Button>
    </Layout>
  );
}

export default AddConsumer;
