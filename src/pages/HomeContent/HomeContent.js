import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { useTranslation } from "react-i18next";
import Box from '@material-ui/core/Box';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const View = ({ children, handleNextView, disableNavigationNext }) => (
  <Box display="flex" width={1} height="100%" alignItems="center">
    <div style={{ flex: 1, textAlign: "center" }}>{children}</div>
    {!disableNavigationNext && <NavigateNextIcon onClick={handleNextView} />}
  </Box>
)

const HomeContent = () => {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const handleNextView = () => {
    setIndex(index + 1)
  }

  return (
    <SwipeableViews index={index} style={{ height: "100vh" }} containerStyle={{ height: "100vh" }}>
      <View handleNextView={handleNextView}>
        {t("home#intro")}
      </View>
      <View handleNextView={handleNextView}>
        {t("home#searchStoreCode")}
      </View>
      <View handleNextView={handleNextView}>
        {t("home#storeCode")}
      </View>
      <View handleNextView={handleNextView}>
        {t("home#insertEmail")}
      </View>
      <View handleNextView={handleNextView} disableNavigationNext>
        {t("home#status")}
      </View>
    </SwipeableViews>
  );
}

export default withRouter(HomeContent);
