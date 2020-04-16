import React from "react";

import ReactDOM from "react-dom";

import CookieBanner from "./CookieBanner";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<CookieBanner />, div);

  ReactDOM.unmountComponentAtNode(div);
});
