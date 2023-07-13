import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ChatListItem from "./ChatListItem/ChatListItem";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./ChatList.css";
import { useDispatch, useSelector } from "react-redux";
import AddChatBar from "../AddChatBar/AddChatBar";
import {
  showAddChatBar,
  addChat,
  getChatsData,
} from "../../../Store/chats/actions";

const ChatList = () => {
  const chats = useSelector((state) => state.chats.chatList);
  const showModal = useSelector((state) => state.chats.showModal);

  const dispatch = useDispatch();

  useEffect(() => getChatsData(dispatch), []);

  const handleAddChat = () => {
    dispatch(showAddChatBar());
  };

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
};

export default ChatList;
