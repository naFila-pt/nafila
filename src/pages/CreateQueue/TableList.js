import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ListWrapper = styled.div`
  margin-top: ${props => (props.isDesktop ? "4rem" : "1rem")};
  margin-bottom: ${props => (props.isDesktop ? "5rem" : "1.25rem")};
  width: 100%;
  padding: ${props => !props.isDesktop && "2rem"};

  .MuiListItem-root {
    padding: ${props => props.isDesktop && "10px 62px"};
    background-color: #fff;
    position: relative;
    width: ${props => props.isDesktop && "100%"};
  }
  .MuiListItem-root:nth-child(2n) {
    background-color: #ededed;
  }
  .MuiListItem-root:first-child {
    border-top: 5px solid #4c0788;
  }
  .MuiListItem-root:last-child {
    border-bottom: 5px solid #4c0788;
  }
`;
// const randomColor = () => "#" + Math.random().toString(16).substr(-6); //Replace by RAG colors

// const RagStatus = styled.div`
//   height: 101%;
//   width: 10px;
//   position: absolute;
//   left: 0;
//   background-color: ${props => props.bg};
// `;

const SubHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.isDesktop && "1rem 4rem"};
`;

const TableList = ({ items, onDelete, isDesktop }) => {
  const { t } = useTranslation();

  return (
    <ListWrapper isDesktop={isDesktop}>
      <SubHeaderWrapper isDesktop={isDesktop}>
        <div>{t("admin#table_column_1_name")}</div>
        <div>{t("admin#table_column_2_name")}</div>
      </SubHeaderWrapper>
      <List>
        {items.map(item => {
          return (
            <ListItem>
              {/* <RagStatus bg={randomColor()} /> */}
              <ListItemText primary={item.name} />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(item.id)}
                style={{ color: "#4C0788" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
};

export default TableList;
