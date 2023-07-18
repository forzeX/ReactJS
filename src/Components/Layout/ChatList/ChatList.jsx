import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ChatListItem from "./ChatListItem/ChatListItem";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Fab } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import "./ChatList.css";
import { useDispatch, useSelector } from "react-redux";
import AddChatBar from "../AddChatBar/AddChatBar";
import {
  showAddChatBar,
  addChat,
  getChatsData,
  toggleVisibility,
} from "../../../Store/chats/actions";

const ChatList = () => {
  const chats = useSelector((state) => state.chats.chatList);
  const showModal = useSelector((state) => state.chats.showModal);

  const dispatch = useDispatch();

  useEffect(() => getChatsData(dispatch), []);

  const handleAddChat = () => {
    dispatch(showAddChatBar());
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1079px)" });
  const isActive = useSelector((state) => state.chats.isActive);

  const handleClick = () => {
    dispatch(toggleVisibility());
  };

  if (isMobile & !isActive) {
    return (
      <>
        <Fab
          sx={[
            { position: "absolute" },
            { left: "5px" },
            { top: "calc(10vh + 5px)" },
          ]}
          color="primary"
          aria-label="add"
          onClick={handleClick}
          size="medium"
        >
          <FormatListBulletedIcon />
        </Fab>
      </>
    );
  } else {
    return (
      <List className="chat-list">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} text={chat.name} id={chat.id} />
        ))}
        <Button onClick={handleAddChat} startIcon={<AddCircleIcon />}>
          Создать новый чат
        </Button>
        {showModal && <AddChatBar />}
      </List>
    );
  }
};

export default ChatList;
