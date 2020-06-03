import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Input } from "@material-ui/core";
import styled from "styled-components";
import bg_desktop from "../../assets/bg/home_desktop.svg";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Layout from "../../components/AdminLayout";
import TableList from "./TableList";
import { functions } from "../../firebase";

export const Form = styled.form`
  text-align: center;
  flex: 1;
  display: flex;
  margin-top: 7vh;
  flex-direction: ${props => (props.isDesktop ? "row" : "column")};
  width: 100%;

  .MuiInput-input {
    text-align: center;
  }
  .MuiInput-root {
    margin-right: 74px;
  }
  .MuiButtonWrapper {
    margin-top: ${props => (props.isDesktop ? 0 : "2rem")};
  }
`;

const ContentWrapper = styled.div`
  padding: ${props => props.isDesktop && "0 76px 0 38px"};
  display: ${props => !props.isDesktop && "flex"};
  flex-direction: ${props => !props.isDesktop && "column"};
  align-items: ${props => !props.isDesktop && "center"};
`;

const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function CreateQueue({ isDesktop, openSnackbar }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [queues, setQueues] = useState([]);
  const [inputData, setInputData] = useState("");

  const handleChange = event => {
    setInputData(event.target.value);
  };

  const handleFechtUserByEmail = e => {
    e.preventDefault();
    const getUserByEmail = functions.httpsCallable("getUserByEmail");
    setLoading(true);

    let requestBody = {};
    if (emailIsValid(inputData)) {
      requestBody = { email: inputData };
    } else {
      requestBody = { queueId: inputData };
    }

    getUserByEmail(requestBody)
      .then(async function ({ data: { id, user } }) {
        if (queues.some(el => el.id === id))
          throw new Error("User already selected");
        setQueues(prevState => [
          ...prevState,
          { id, name: user.defaultQueueName }
        ]);
        setInputData("");
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        openSnackbar(error.message);
      });
  };
  const handleCreateStatusScreen = e => {
    const users = queues.map(q => q.id);
    if (!users.length) return openSnackbar("Please select a user");
    e.preventDefault();
    window.location.href = `queue-status?users=${users.toString()}`;
  };
  const handleOnDelete = id => {
    setQueues(prevState => prevState.filter(el => el.id !== id));
    setInputData("");
  };
  return (
    <Layout bg={bg_desktop} textAlign="left" hideLogo>
      <Header bg="transparent" />
      <div style={{ padding: isDesktop ? "93px 165px 21px" : "0 2rem" }}>
        <Typography
          variant={isDesktop ? "h1" : "h2"}
          style={{ padding: "1rem 0" }}
          dangerouslySetInnerHTML={{
            __html: t("admin#createQueue_title")
          }}
        />
        <Typography
          variant={isDesktop ? "h4" : "h5"}
          style={{ fontWeight: "normal" }}
          dangerouslySetInnerHTML={{
            __html: t("admin#createQueue_description")
          }}
        />
        <ContentWrapper>
          <Form onSubmit={handleFechtUserByEmail} isDesktop={isDesktop}>
            <Input
              placeholder={t("admin#add_queue_button_placeholder")}
              value={inputData}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button
              size={isDesktop ? "medium" : "small"}
              variant={loading && "inactiveGray"}
              onClick={handleFechtUserByEmail}
              add
            >
              {t("admin#add_queue_button")}
            </Button>
          </Form>
          {queues.length > 0 && (
            <TableList
              items={queues}
              onDelete={handleOnDelete}
              isDesktop={isDesktop}
            />
          )}
          <Button
            size={isDesktop ? "medium" : "small"}
            onClick={handleCreateStatusScreen}
            forward
            style={{
              position: "fixed",
              right: isDesktop && "165px",
              bottom: 0,
              margin: isDesktop ? "0 76px 2rem 0" : "0 0 10px 0"
            }}
          >
            {t("admin#create_status_screen")}
          </Button>
        </ContentWrapper>
      </div>
    </Layout>
  );
}

export default CreateQueue;
