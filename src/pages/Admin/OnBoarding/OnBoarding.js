import React from "react";

import { useTranslation } from "react-i18next";

import DesktopLayout from "../../../components/OnBoardingLayout/Admin/DesktopLayout";
import MobileLayout from "../../../components/OnBoardingLayout/Admin/MobileLayout";

const OnBoarding = props => {
  const { t } = useTranslation();

  const endOnBoarding = () => {
    window.open("https://geralnafilapt.typeform.com/to/VtDUdM", "_blank");
  };

  if (props.isDesktop) {
    return <DesktopLayout endOnBoarding={endOnBoarding} t={t} />;
  }
  return <MobileLayout endOnBoarding={endOnBoarding} t={t} />;
};

export default OnBoarding;
