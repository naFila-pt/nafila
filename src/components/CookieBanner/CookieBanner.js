import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { PRIVACY_PATH } from "../../constants/RoutesConstants";

const CookieBannerContainer = styled.div`
  width: 100%;
  height: 56px;
  background-color: #ffc836;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

const PrivacylinkStyled = styled.a`
  text-decoration: none;
  color: white;
  font-weight: bold;
`;

const CookieBanner = ({ handleBannerCloseClick }) => {
  const { t } = useTranslation();

  let cookieBannerSeen;

  try {
    cookieBannerSeen = localStorage.getItem("cookieBannerSeen");
  } catch (error) {
    cookieBannerSeen = false;
  }

  //disable temporarily until we have privacy policy online
  cookieBannerSeen = true;

  const [shouldShowCookieBanner, setShouldShowCookieBanner] = useState(
    !cookieBannerSeen
  );

  handleBannerCloseClick = () => {
    try {
      localStorage.setItem("cookieBannerSeen", true);
    } catch (error) {}

    setShouldShowCookieBanner(false);
  };

  if (!shouldShowCookieBanner) return null;

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ position: "sticky", top: 0, zIndex: 999 }}
    >
      <CookieBannerContainer>
        <Grid item style={{ padding: 16 }}>
          <Typography variant="body2">
            {t("global#cookie_banner")}{" "}
            <PrivacylinkStyled href={PRIVACY_PATH} target={"_blank"}>
              {t("global#cookie_bannerLink")}{" "}
            </PrivacylinkStyled>
          </Typography>
        </Grid>
        <Grid item>
          <CloseIcon onClick={handleBannerCloseClick} />
        </Grid>
      </CookieBannerContainer>
    </Grid>
  );
};

export default CookieBanner;
