import React from "react";
import styled from "styled-components";

const SLabel = styled.p`
  margin: 2px 0;
  line-height: 1.1;
  font-size: ${props => (props.isDesktop ? "30px" : "12px")};
  & span {
    margin-right: 4px;
  }
`;

export const Label = ({ isDesktop, style, dangerouslySetInnerHTML }) => {
  return (
    <SLabel
      isDesktop={isDesktop}
      style={style}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  );
};
