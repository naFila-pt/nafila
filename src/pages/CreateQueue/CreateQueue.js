import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Input } from "@material-ui/core";
import styled from "styled-components";
import bg_desktop from "../../assets/bg/home_desktop.svg";
import bg_mobile from "../../assets/bg/store_queue_start.svg";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Layout from "../../components/AdminLayout";
import TableList from "./TableList";
// import { firestore, functions, analytics, auth } from "../../../../firebase";
import { firestore, functions, analytics, auth } from "../../firebase";

import Logo from "../../assets/icons/naFilaOnlyLine.svg";
import FooterRight from "../../assets/icons/footerNaFilaLink.svg";
import FooterLeft from "../../assets/icons/footerTech4covidAndPartners.svg";
import TitleComponent from "../../components/TitleComponent";
// import { firestore, analytics } from "../../firebase";

export const Form = styled.form`
  text-align: center;
  padding: 0 76px 105px 38px;
  flex: 1;
  display: flex;
  margin-top: 15vh;

  .MuiInput-input {
    text-align: center;
  }
  .MuiInput-root {
    margin-right: 74px;
  }
`;

function CreateQueue({ isDesktop }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [queues, setQueues] = useState([]);
  const [storeId, setStoreId] = useState("");

  const handleChange = event => {
    setStoreId(event.target.value);
  };

  const handleFechtUserByEmail = () => {
    const getUserByEmail = functions.httpsCallable("getUserByEmail");

    getUserByEmail({
      email: storeId
    }).then(data => console.log(data));
  };

  useEffect(() => {
    firestore
      .collection("queues")
      .get()
      .then(({ docs }) => {
        // analytics.setUserProperties({
        //   shop: queueData.shop,
        //   retailerGroup: queueData.retailerGroup,
        //   shoppingCentre: queueData.shoppingCentre
        // });
        const allQueues = docs.map(doc => doc.data());
        setLoading(false);
        setQueues(allQueues);
      })
      .catch(e => console.error(e));
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout bg={isDesktop ? bg_desktop : bg_mobile} textAlign="left">
      <div style={{ padding: "4rem" }}>
        <Typography
          variant="h1"
          // style={{ fontWeight: "normal" }}
          dangerouslySetInnerHTML={{
            __html: t("admin#createQueue_title")
          }}
        />
        <Typography
          // variant="h2"
          style={{ fontWeight: "normal" }}
          dangerouslySetInnerHTML={{
            __html: t("admin#createQueue_description")
          }}
        />
        <Form onSubmit={() => alert("test")}>
          <Input
            placeholder={t("admin#add_queue_button_placeholder")}
            value={storeId}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            // variant={requesting ? "inactiveGray" : "gray"}
            onClick={handleFechtUserByEmail}
            add
          >
            {t("admin#add_queue_button")}
          </Button>
        </Form>
        <TableList />
      </div>
    </Layout>
  );
}

export default CreateQueue;
