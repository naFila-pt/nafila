import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { useTranslation } from "react-i18next";

const StepperContent = ({
  titleLabel,
  descriptionLabel,
  infoLabel,
  children
}) => {
  const { t } = useTranslation();

  return (
    <Grid item style={{ flex: "80%" }}>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ maxWidth: "50%" }}>
          <Grid container direction="row">
            <Logo height="200px" />

            <Grid item style={{ marginTop: "15px" }}>
              <span
                style={{ fontSize: "48px" }}
                dangerouslySetInnerHTML={{
                  __html: t("onboarding#intro_pitch")
                }}
              />
              <Typography
                variant="h1"
                style={{
                  margin: "0.3em 0 0",
                  fontSize: "32px",
                  lineHeight: "38px",
                  fontWeight: "900"
                }}
              >
                {t("onboarding#intro_welcome")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <div
              style={{ fontSize: "36px", color: "#FFC836", fontWeight: 900 }}
              dangerouslySetInnerHTML={{
                __html: t(titleLabel)
              }}
            />

            <div
              style={{ fontSize: "36px", lineHeight: "43px" }}
              dangerouslySetInnerHTML={{
                __html: t(descriptionLabel)
              }}
            />
            {infoLabel && (
              <div
                style={{
                  fontSize: "20px",
                  lineHeight: "18px",
                  marginTop: "15px"
                }}
                dangerouslySetInnerHTML={{
                  __html: t(infoLabel)
                }}
              />
            )}
          </Grid>
        </Grid>
        {children}
      </Grid>
    </Grid>
  );
};

export default StepperContent;
