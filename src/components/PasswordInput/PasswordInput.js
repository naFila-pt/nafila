import { InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useState } from "react";

const styles = theme => ({
  eye: {
    cursor: "pointer"
  }
});

const PasswordInput = props => {
  const [isPasswordMasked, setIsPasswordMasked] = useState(true);
  const { classes } = props;

  const togglePasswordMask = () => {
    setIsPasswordMasked(!isPasswordMasked);
  };
  const iconProps = {
    className: classes.eye,
    onClick: togglePasswordMask
  };
  return (
    <TextField
      type={isPasswordMasked ? "password" : "text"}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isPasswordMasked ? (
              <Visibility {...iconProps} />
            ) : (
              <VisibilityOff {...iconProps} />
            )}
          </InputAdornment>
        )
      }}
    />
  );
};

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default withStyles(styles)(PasswordInput);
