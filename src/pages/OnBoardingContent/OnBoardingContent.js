import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import OnBoardingDesktop from "./OnBoardingDesktop";
import OnBoardingMobile from "./OnBoardingMobile";

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const OnBoardingContent = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return _ => window.removeEventListener("resize", debouncedHandleResize);
  });

  return !isDesktop ? <OnBoardingMobile /> : <OnBoardingDesktop />;
};

export default withRouter(OnBoardingContent);
