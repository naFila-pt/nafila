import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import Ticket from "./Ticket";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Ticket />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
