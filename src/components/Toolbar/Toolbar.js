import React from "react";
import styled from "styled-components";
import Toolbar from "@material-ui/core/Toolbar";
import { ReactComponent as Logo } from "../../assets/logo-mini.svg";

const StyledToolbar = styled.div`
  & .MuiToolbar-root {
    background-color: white;
  }
`;

const ToolbarWrapper = () => (
  <StyledToolbar>
    <Toolbar
      styles={{ position: "absolute", top: 0, backgroundColor: "white" }}
    >
      <Logo
        style={{ flex: 1, cursor: "pointer" }}
        onClick={() => (window.location.href = "/")}
      />
    </Toolbar>
  </StyledToolbar>
);

export default ToolbarWrapper;
