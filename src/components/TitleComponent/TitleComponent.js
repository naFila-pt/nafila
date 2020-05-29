import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { analytics } from "../../firebase";

const defaultTitle = process.env.REACT_APP_TITLE;
let currentPageId = null; //global state

const TitleComponent = ({ title, pageId }) => {
  useEffect(() => {
    if (pageId !== currentPageId) {
      currentPageId = pageId;
      analytics.setCurrentScreen(currentPageId);
    }
  }, [pageId]);

  return (
    <Helmet>
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  );
};

export default TitleComponent;
