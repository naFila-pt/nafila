import styled from "styled-components";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";

export const HeadlineContainer = styled.div`
  color: ${PRIMARY_COLOR};
  font-weight: 900;
  font-size: 2em;
  margin: 1em 0 1.5em;

  .MuiTypography-root {
    font-size: 1em;
  }
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 5vh;
  width: 100%;

  .MuiButtonWrapper {
    margin-bottom: 20px;
  }
`;
