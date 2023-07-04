import React from "react";
import ReactDOM from "react-dom/client";
import ChatListItem from "./ChatListItem/ChatListItem";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./ChatList.css";

const ChatList = ({ chats, onAddMessage }) => {
  return (
    <List className="chat-list">
      {chats.map((chat) => (
        <ChatListItem key={chat[0]} text={chat[1].title} id={chat[0]} />
      ))}
      <Button onClick={onAddMessage} startIcon={<AddCircleIcon />}>
        Создать новый чат
      </Button>
    </List>
  );
};

export default ChatList;
