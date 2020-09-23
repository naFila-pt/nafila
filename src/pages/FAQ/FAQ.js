import React from "react";
import { useTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import bgMainMobile from "@src/assets/bg/terms_mobile.svg";
import bgMain from "@src/assets/bg/faq_desktop.svg";
import faqIcon from "@src/assets/icons/faq_icon.svg";
import expandIcon from "@src/assets/icons/expand-icon.svg";
import { PRIMARY_COLOR } from "@src/constants/ColorConstants";

import Header from "@src/components/Header";
import Footer from "@src/components/Footer";

const ExpandMoreIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  position: relative;
  background-color: white;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bgMainMobile});
  padding: 28px;

  h1,
  h3 {
    font-weight: 900;
  }

  h3 {
    text-transform: uppercase;
  }

  h1 {
    font-size: 40px;
  }

  a {
    color: ${PRIMARY_COLOR};
    font-weight: bold;
  }

  @media (min-width: 768px) {
    background-image: url(${bgMain});
  }

  @media (min-width: 1200px) {
    padding: 24px 186px;
  }
`;

const HeaderIcon = styled(Grid)`
  display: flex;
  align-items: center;
  & img {
    margin-left: 10px;
  }
`;

const Question = styled(Grid)`
  width: 100%;

  & .question {
    margin: 0;
    color: black;
    font-weight: 700;
    font-size: 14px;
    @media (min-width: 768px) {
      font-size: 18px;
    }
  }

  & .answer {
    margin: 0;
    font-weight: 400;
    color: black;
    font-size: 14px;
    @media (min-width: 768px) {
      font-size: 18px;
    }
    line-height: 1.6;
  }

  .MuiExpansionPanelDetails-root {
    background-color: #f5f5f5;
    padding: 16px;
  }
`;

const MobileContainer = styled(Grid)`
  h3 {
    cursor: pointer;
    font-weight: 900;
    color: #979797;
    &.selected {
      color: ${PRIMARY_COLOR};
    }
  }

  .labels {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
`;

const LOJISTA_QUESTIONS = [
  { question: "faq#lojista_question_1", answer: "faq#lojista_answer_1" },
  { question: "faq#lojista_question_2", answer: "faq#lojista_answer_2" },
  { question: "faq#lojista_question_3", answer: "faq#lojista_answer_3" },
  { question: "faq#lojista_question_4", answer: "faq#lojista_answer_4" },
  { question: "faq#lojista_question_5", answer: "faq#lojista_answer_5" },
  { question: "faq#lojista_question_6", answer: "faq#lojista_answer_6" },
  { question: "faq#lojista_question_7", answer: "faq#lojista_answer_7" },
  { question: "faq#lojista_question_8", answer: "faq#lojista_answer_8" },
  { question: "faq#lojista_question_9", answer: "faq#lojista_answer_9" },
  { question: "faq#lojista_question_10", answer: "faq#lojista_answer_10" },
  { question: "faq#lojista_question_11", answer: "faq#lojista_answer_11" },
  { question: "faq#lojista_question_12", answer: "faq#lojista_answer_12" },
  { question: "faq#lojista_question_13", answer: "faq#lojista_answer_13" },
  { question: "faq#lojista_question_14", answer: "faq#lojista_answer_14" }
];

const CONSUMIDOR_QUESTIONS = [
  { question: "faq#consumidor_question_1", answer: "faq#consumidor_answer_1" },
  { question: "faq#consumidor_question_2", answer: "faq#consumidor_answer_2" },
  { question: "faq#consumidor_question_3", answer: "faq#consumidor_answer_3" },
  { question: "faq#consumidor_question_4", answer: "faq#consumidor_answer_4" },
  { question: "faq#consumidor_question_5", answer: "faq#consumidor_answer_5" },
  { question: "faq#consumidor_question_6", answer: "faq#consumidor_answer_6" }
];

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: "0px",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    },
    "&:last-child": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px"
    },
    "&:first-child": {
      borderTopLeftRadius: "0px",
      borderTopRightRadius: "0px"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

export default function FAQ({ isDesktop }) {
  const { t } = useTranslation();
  const [expandedConsumidor, setExpandedConsumidor] = React.useState("");
  const [expandedLojista, setExpandedLojista] = React.useState("");
  const [selectedColumn, setSelectedColumn] = React.useState("lojista");
  const handlePanelChange = (panel, func) => (event, newExpanded) => {
    func(newExpanded ? panel : false);
  };

  const renderLojistaQuestions = () =>
    LOJISTA_QUESTIONS.map((lq, index) => (
      <Question>
        <ExpansionPanel
          expanded={expandedLojista === `panel${index}`}
          onChange={handlePanelChange(`panel${index}`, setExpandedLojista)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon src={expandIcon} />}
            aria-controls="panel1a-content"
          >
            <p
              className="question"
              dangerouslySetInnerHTML={{ __html: t(lq.question) }}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p
              className="answer"
              dangerouslySetInnerHTML={{ __html: t(lq.answer) }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Question>
    ));

  const renderConsumidorQuestions = () =>
    CONSUMIDOR_QUESTIONS.map((lq, index) => (
      <Question>
        <ExpansionPanel
          expanded={expandedConsumidor === `panel${index}`}
          onChange={handlePanelChange(`panel${index}`, setExpandedConsumidor)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon src={expandIcon} />}
            aria-controls="panel1a-content"
          >
            <p
              className="question"
              dangerouslySetInnerHTML={{ __html: t(lq.question) }}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p
              className="answer"
              dangerouslySetInnerHTML={{ __html: t(lq.answer) }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Question>
    ));

  return (
    <Grid style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <MainContainer>
        <Grid container spacing={4}>
          <HeaderIcon item xs={12} md={12}>
            <h1>FAQs</h1>
            <img src={faqIcon} width="55px" height="55px" alt="faq" />
          </HeaderIcon>
          {isDesktop ? (
            <>
              <Grid item xs={12} md={6}>
                <h3>{t("faq#lojista_label")}</h3>
                {renderLojistaQuestions()}
              </Grid>
              <Grid item xs={12} md={6}>
                <h3>{t("faq#consumidor_label")}</h3>
                {renderConsumidorQuestions()}
              </Grid>
            </>
          ) : (
            <MobileContainer item xs={12}>
              <div className="labels">
                <h3
                  className={selectedColumn === "lojista" && "selected"}
                  onClick={() => setSelectedColumn("lojista")}
                >
                  {t("faq#lojista_label")}
                </h3>
                <h3
                  className={selectedColumn === "consumidor" && "selected"}
                  onClick={() => setSelectedColumn("consumidor")}
                >
                  {t("faq#consumidor_label")}
                </h3>
              </div>
              {selectedColumn === "lojista"
                ? renderLojistaQuestions()
                : renderConsumidorQuestions()}
            </MobileContainer>
          )}
        </Grid>
      </MainContainer>
      <div style={{ position: "static", bottom: 0, left: 0 }}>
        <Footer />
      </div>
    </Grid>
  );
}
