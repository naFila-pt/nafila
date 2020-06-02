import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

const ListWrapper = styled.div`
  margin-top: 4rem;

  .MuiListItem-root {
    padding: 10px 62px;
    background-color: #fff;
    position: relative;
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
const randomColor = () => "#" + Math.random().toString(16).substr(-6);

const RagStatus = styled.div`
  height: 101%;
  width: 10px;
  position: absolute;
  left: 0;
  background-color: ${props => props.bg};
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem 1rem 3rem;
`;

const subheader = () => (
  <SubHeaderWrapper>
    <div>Nome da Loja</div>
    <div>Apagar</div>
  </SubHeaderWrapper>
);

const TableList = ({ items, onDelete }) => {
  return (
    <ListWrapper>
      {subheader()}
      <List>
        {items.map(el => {
          return (
            <ListItem>
              <RagStatus bg={randomColor()} />
              <ListItemText primary="Single-line item" />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(el.id)}
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
