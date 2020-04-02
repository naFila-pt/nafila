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
  padding: 50px 30px;

  .MuiInput-root {
    margin-bottom: 2em;
  }

  button {
    margin-top: 2em;
  }

  .MuiTextField-root {
    border-color: ${PRIMARY_COLOR} !important;

    label {
      width: 100%;
      color: ${PRIMARY_COLOR} !important;
    }

    .MuiInputLabel-shrink {
      transform-origin: top center;
    }

    .MuiInput-root {
      &:before {
        border-color: ${SECONDARY_COLOR} !important;
      }

      &:after {
        border-color: ${PRIMARY_COLOR} !important;
      }
    }
  }

  .MuiInput-input {
    text-align: center;
  }

  .MuiAlert-root {
    text-align: left;
  }

  input {
    width: 100%;
  }
`;
