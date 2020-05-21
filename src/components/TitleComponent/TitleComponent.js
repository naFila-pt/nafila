import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { analytics } from "../../firebase";

const defaultTitle = process.env.REACT_APP_TITLE;
let currentPage = null; //global state

const TitleComponent = ({ title }) => {
  const [titleTagContent, setTitleTageContent] = useState(title);

  useEffect(() => {
    if (titleTagContent !== currentPage) {
      currentPage = titleTagContent;
      analytics.setCurrentScreen(currentPage);
    } else {
      setTitleTageContent(defaultTitle);
    }
  }, [titleTagContent]);

  return (
    <Helmet>
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  );
};

export default TitleComponent;
