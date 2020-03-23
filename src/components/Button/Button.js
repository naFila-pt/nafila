import React from 'react'
import Button from '@material-ui/core/button'

import { WHITE_COLOR, PRIMARY_COLOR } from '../../constants/ColorConstants'

const defaultStyle = {
  display: 'block',
  width: '100%',
  borderRadius: '250px'
}
const styles = {
  PRIMARY: {
    backgroundColor: PRIMARY_COLOR,
    '&:hover': {
      backgroundColor: PRIMARY_COLOR,
    },
    ...defaultStyle,
  },
  HOLLOW: {
    border: `1px ${PRIMARY_COLOR} solid`,
    backgroundColor: WHITE_COLOR,
    '&:hover': {
      backgroundColor: WHITE_COLOR,
    },
    ...defaultStyle,
  }
}

function CustomButton({ children, type, ...rest }) {
  return (
    <Button style={styles[type]}>
      {children}
    </Button>
  )
}

CustomButton.defaultProps = {
  type: 'PRIMARY'
}

export default CustomButton
