import {
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from "../../../constants/ColorConstants";
import styled from "styled-components";

export const RecoverLink = styled.a`
    flex: 1;
    margin-top: 10px;
  `;

export const Form = styled.form`
    text-align: center;
    padding: 0 38px 105px;
    flex: 1;
    display: flex;
    flex-direction: column;
  
    .MuiTextField-root {
      border-color: ${PRIMARY_COLOR} !important;
  
      label {
        color: ${PRIMARY_COLOR} !important;
      }
  
      .MuiInput-root {
        &:before {
          border-color: ${SECONDARY_COLOR} !important;
        }
  
        &:after {
          border-color: ${PRIMARY_COLOR} !important;
        }
      }
  `;
export const LogoContainer = styled.div`
  text-align: center;
  padding: 80px 0 0;
`;