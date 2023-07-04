import React from "react";
import ReactDOM from "react-dom/client";
import ChatListItem from "./ChatListItem/ChatListItem";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./ChatList.css";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../../Store/actions";

const ChatList = () => {
  const store = useSelector((state) => state.chatsStorage);
  const dispatch = useDispatch();
  const chats = Object.entries(store);

  const handleAddChat = () => {
    dispatch(addChat());
    console.log(store);
  };

  return (
    <List className="chat-list">
      {chats.map((chat) => (
        <ChatListItem key={chat[0]} text={chat[1].title} id={chat[0]} />
      ))}
      <Button onClick={handleAddChat} startIcon={<AddCircleIcon />}>
        Создать новый чат
      </Button>
    </List>
  );
};

export default ChatList;
