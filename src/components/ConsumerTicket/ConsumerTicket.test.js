import React from "react";

import ReactDOM from "react-dom";

import ConsumerTicket from "./ConsumerTicket";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<ConsumerTicket number={1} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
