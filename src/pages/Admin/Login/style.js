import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../constants/ColorConstants'
import styled from 'styled-components'

export const RecoverLink = styled.a`
  flex: 1;
  margin-top: 10px;
`

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
  }

  .MuiAlert-root {
    text-align: left;
  }

  input {
    width: 100%;
  }
`
