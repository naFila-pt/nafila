import React from "react";

import { useTranslation } from "react-i18next";

import DesktopLayout from "../../../components/OnBoardingLayout/Admin/DesktopLayout";
import MobileLayout from "../../../components/OnBoardingLayout/Admin/MobileLayout";
import { ADMIN_SIGNUP_PATH } from "@src/constants/RoutesConstants";

const OnBoarding = props => {
  const { t } = useTranslation();

  const endOnBoarding = () => {
    window.location.href = ADMIN_SIGNUP_PATH;
  };

  if (props.isDesktop) {
    return <DesktopLayout endOnBoarding={endOnBoarding} t={t} />;
  }
  return <MobileLayout endOnBoarding={endOnBoarding} t={t} />;
};

export default OnBoarding;
