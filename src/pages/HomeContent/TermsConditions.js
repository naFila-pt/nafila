import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import HomeLayout from "../../components/HomeLayout";
import Typography from "@material-ui/core/Typography";
import Button from "../../components/Button";

import bgMain from "../../assets/bg/main.svg";

const useStyles = makeStyles({
  bottomButton: {
    position: "absolute",
    left: 0,
    bottom: "2em",
    width: "100%",
    textAlign: "center"
  }
});

const TermsConditions = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleCloseButton = () => {
    window.close();
  };

  return (
    <HomeLayout bg={[bgMain]}>
      <div style={{ padding: "0 1.3em" }}>
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          <Typography variant="h1">{t("terms#title")}</Typography>
        </div>

        <div className="termosCondicoesText" style={{ height: "56vh", overflowY: "scroll", padding: "0 15px" }}>
          <pre
            style={{ lineHeight: "1.188em", whiteSpace: "pre-line", textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: t("terms#text") }}
          />
        </div>

        <div className={classes.bottomButton}>
          <Button variant="gray" onClick={handleCloseButton}>
            {t("terms#close_button")}
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default withRouter(TermsConditions);
