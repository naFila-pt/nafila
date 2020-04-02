import React from "react";

import ReactDOM from "react-dom";

import OnBoardingLayout from "./OnBoardingLayout";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<OnBoardingLayout />, div);

  ReactDOM.unmountComponentAtNode(div);
});
