import React from "react";
import MuiButton from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RefreshArrowsIcon from "@material-ui/icons/Cached";

const Button = ({
  children,
  style,
  variant,
  forward,
  backward,
  refresh,
  onClick,
  dangerouslySetInnerHTML,
  mobile,
  ...rest
}) => {
  const styles = {
    base: {
      minWidth: "18em",
      background: "#4C0788",
      border: "1px solid #4C0788",
      borderRadius: "2.13em",
      boxShadow: "0px 11px 19px rgba(0, 0, 0, 0.2)",
      color: "#fff"
    },
    inactive: {
      background: "rgba(69, 21, 131, 0.7)"
    },
    active: {
      border: "1px solid #4C0788"
    },
    secondary: {
      background: "#fff",
      border: "1px #4C0788 solid",
      color: "#4C0788"
    },
    onboarding: {
      background: "#FFC836",
      color: "inherit"
    },
    gray: {
      background: "#EDEDED",
      color: "#4C0788"
    },
    inactiveGray: {
      background: "#EDEDED",
      color: "#4C0788",
      opacity: ".5"
    }
  };

  const variantStyle = {
    ...styles.base,
    ...styles[variant]
  };

  // avoids overcomplicating translations with css garbage
  if (dangerouslySetInnerHTML) {
    const match = "na<b>fila</b>";
    const replacement = `<span style="text-transform: lowercase">na<b>fila</b></span>`;
    dangerouslySetInnerHTML.__html = dangerouslySetInnerHTML.__html.replace(
      match,
      replacement
    );
  }

  return (
    <div
      style={{
        display: "inline-block",
        background: "#fff",
        borderRadius: "2.13em",
        ...style
      }}
      className="MuiButtonWrapper"
    >
      <MuiButton
        onClick={onClick}
        style={variantStyle}
        className="MuiButtonBase-custom"
        disableRipple={variant === "inactive" ? true : false}
        {...rest}
      >
        <Grid container style={{ padding: ".4em .5em" }}>
          <ArrowBackIcon
            fontSize={mobile ? "small" : "default"}
            style={{ visibility: backward ? "visible" : "hidden" }}
          />
          <Grid item style={{ flex: 1 }}>
            <Typography
              variant={mobile ? "body2" : "h5"}
              dangerouslySetInnerHTML={dangerouslySetInnerHTML}
            >
              {children}
            </Typography>
          </Grid>
          {refresh ? (
            <RefreshArrowsIcon fontSize={mobile ? "small" : "default"} />
          ) : (
            <ArrowForwardIcon
              fontSize={mobile ? "small" : "default"}
              style={{ visibility: forward ? "visible" : "hidden" }}
            />
          )}
        </Grid>
      </MuiButton>
    </div>
  );
};

export default Button;
