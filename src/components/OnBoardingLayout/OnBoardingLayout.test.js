import React from "react";

import ReactDOM from "react-dom";

import OnBoardingLayoutMobile from "./OnBoardingLayoutMobile";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<OnBoardingLayoutMobile />, div);

  ReactDOM.unmountComponentAtNode(div);
});
