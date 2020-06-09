import React from "react";
import Box from "@material-ui/core/Box";
import videoSrc from "@src/assets/nafila_audiooff_QRCODE.mp4";

export const Video = ({ isDesktop }) => {
  return (
    <Box
      width="auto"
      height="40%"
      m={isDesktop ? "10px 0 10px 20px" : "0"}
      display={!isDesktop && "flex"}
      justifyContent={!isDesktop && "center"}
    >
      <video
        width="auto"
        muted
        autoPlay
        loop
        height={isDesktop ? "100%" : "70%"}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};
