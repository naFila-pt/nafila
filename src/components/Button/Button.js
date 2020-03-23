import React from 'react';
import MuiButton from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Button = ({ children, style, variant, forward, backward, onClick, dangerouslySetInnerHTML }) => {
  const styles = {
    base: {
      minWidth: '18em',
      background: '#4C0788',
      borderRadius: '2.13em',
      boxShadow: '0px 11px 19px rgba(0, 0, 0, 0.2)',
      color: '#fff'
    },
    inactive: {
      background: 'rgba(69, 21, 131, 0.7)'
    },
    active: {
      border: '1px solid #4C0788',
    }
  }

  const variantStyle = {
    ...styles.base,
    ...styles[variant]
  }

  // avoids overcomplicating translations with css garbage
  if (dangerouslySetInnerHTML) {
    const match = 'na<b>fila</b>'
    const replacement = '<span style=\"text-transform: lowercase\">na<b>fila</b></span>'
    dangerouslySetInnerHTML.__html = dangerouslySetInnerHTML.__html.replace(match, replacement)
  }
  

  return (
    <div style={{ display: 'inline-block', background: '#fff', borderRadius: '2.13em', ...style }}>
      <MuiButton onClick={onClick} style={variantStyle} disableRipple={variant === 'inactive' ? true : false}>
        <Grid container style={{ padding: '.4em .5em' }}>
          <ArrowBackIcon style={{ visibility: backward ? 'visible' : 'hidden' }} />
          <Grid item style={{ flex: 1 }}>
            <Typography variant="h5" dangerouslySetInnerHTML={dangerouslySetInnerHTML}>{ children }</Typography>
          </Grid>
          <ArrowForwardIcon style={{ visibility: forward ? 'visible' : 'hidden' }} />
        </Grid>
      </MuiButton>
    </div>
  )
}

export default Button;