import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import PosterContent from "./PosterContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <PosterContent />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
