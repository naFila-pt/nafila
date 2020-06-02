import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Input } from "@material-ui/core";
import styled from "styled-components";
import bg_desktop from "../../assets/bg/home_desktop.svg";
import bg_mobile from "../../assets/bg/store_queue_start.svg";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Header from "../../components/Header";
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
  flex: 1;
  display: flex;
  margin-top: 7vh;

  .MuiInput-input {
    text-align: center;
  }
  .MuiInput-root {
    margin-right: 74px;
  }
`;

const ContentWrapper = styled.div`
  padding: 0 76px 105px 38px;
`;

function CreateQueue({ isDesktop }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [queues, setQueues] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ]);
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

  // useEffect(() => {
  //   firestore
  //     .collection("queues")
  //     .get()
  //     .then(({ docs }) => {
  //       // analytics.setUserProperties({
  //       //   shop: queueData.shop,
  //       //   retailerGroup: queueData.retailerGroup,
  //       //   shoppingCentre: queueData.shoppingCentre
  //       // });
  //       const allQueues = docs.map(doc => doc.data());
  //       setLoading(false);
  //       setQueues(allQueues);
  //     })
  //     .catch(e => console.error(e));
  // }, []);

  if (loading) return <Loader />;
  const handleOnDelete = id => {
    setQueues(prevState => prevState.filter(el => el.id !== id));
  };
  return (
    <Layout bg={isDesktop ? bg_desktop : bg_mobile} textAlign="left" hideLogo>
      <Header bg="transparent" />
      <div style={{ padding: "6rem" }}>
        <Typography
          variant="h1"
          style={{ padding: "1rem 0" }}
          dangerouslySetInnerHTML={{
            __html: t("admin#createQueue_title")
          }}
        />
        <Typography
          variant="h4"
          style={{ fontWeight: "normal" }}
          dangerouslySetInnerHTML={{
            __html: t("admin#createQueue_description")
          }}
        />
        <ContentWrapper>
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
          {queues.length > 0 && (
            <TableList items={queues} onDelete={handleOnDelete} />
          )}
        </ContentWrapper>
      </div>
    </Layout>
  );
}

export default CreateQueue;
