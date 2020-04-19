import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import HomeLayout from "../../components/HomeLayout";

import bgMobile from "../../assets/bg/terms_mobile.svg";
import bgDesktop from "../../assets/bg/terms_desktop.svg";

import { ReactComponent as NaFilaIcon } from "../../assets/icons/nafila-text.svg";
import { ReactComponent as Tech4CovidIcon } from "../../assets/icons/tech4covid19-text.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-icon.svg";
import { ReactComponent as NOSIcon } from "../../assets/icons/nos-icon.svg";

const useStyles = makeStyles(theme => ({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em",
    padding: "0 32px 65px",
    [theme.breakpoints.up("md")]: {
      padding: "0 166px 65px"
    }
  },
  footer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(19em, 1fr))",
    width: "100%",
    height: "234px",
    backgroundColor: "#8464AC",
    padding: "10px 32px",
    [theme.breakpoints.up("md")]: {
      padding: "0 166px",
      height: "200px"
    }
  },
  partnerLink: {
    color: "white",
    paddingRight: "16px",
    [theme.breakpoints.up("md")]: {
      paddingRight: "64px"
    }
  }
}));

const TermsConditions = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const isDesktop = window.innerWidth > 768;

  return (
    <>
      <HomeLayout bg={[isDesktop ? bgDesktop : bgMobile]} bgPosition={"top"}>
        <Grid container direction="column" className={classes.gridContainer}>
          <Grid item>
            <Typography variant="h1">{t("terms#title")}</Typography>
          </Grid>

          <div className="termosCondicoesText">
            <pre
              style={{
                lineHeight: "150%",
                whiteSpace: "pre-line",
                textAlign: "justify",
                color: "#484848"
              }}
              dangerouslySetInnerHTML={{ __html: t("terms#text") }}
            />
          </div>
        </Grid>
      </HomeLayout>
      <Grid className={classes.footer}>
        <div
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div>
            <NaFilaIcon />
          </div>
          <div>
            <Link
              style={{ color: "white" }}
              href={"https://tech4covid19.org"}
              target={"_blank"}
            >
              <Tech4CovidIcon />
            </Link>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <p style={{ margin: 0, color: "white", fontSize: "20px" }}>
              Parceiros
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Link
              className={classes.partnerLink}
              href={"https://google.pt"}
              target={"_blank"}
            >
              <GoogleIcon />
            </Link>
            <Link
              className={classes.partnerLink}
              href={"https://nos.pt"}
              target={"_blank"}
            >
              <NOSIcon />
            </Link>
          </div>
          <div>
            <p style={{ margin: 0, color: "white", fontSize: "13px" }}>
              <Link style={{ color: "white" }}>{t("terms#title")}</Link>
              {" | "}
              <Link
                style={{ color: "white" }}
                href={"https://facebook.com"}
                target={"_blank"}
              >
                Facebook
              </Link>
            </p>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default withRouter(TermsConditions);
