import React from "react";
import ReactDOM from "react-dom/client";
import ChatListItem from "./ChatListItem/ChatListItem";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./ChatList.css";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../../Store/actions";

// const ChatList = ({ chats, onAddMessage }) => {
const ChatList = () => {
  // const handleAddChat = useCallback(() => {
  //   const newChatId = Object.keys(messages).length + 1;
  //   updateMessages((messages) => ({
  //     ...messages,
  //     [newChatId]: {
  //       title: `Чат ${newChatId}`,
  //       storage: [],
  //     },
  //   }));
  // }, [messages]);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const chats = Object.entries(store);

  const handleAddChat = () => {
    // const newChatId = Object.keys(chatsStorage).length + 1;
    dispatch(addChat());
  };

  return (
    <List className="chat-list">
      {chats.map((chat) => (
        <ChatListItem key={chat[0]} text={chat[1].title} id={chat[0]} />
      ))}
      {/* <Button onClick={onAddMessage} startIcon={<AddCircleIcon />}> */}
      <Button onClick={handleAddChat} startIcon={<AddCircleIcon />}>
        Создать новый чат
      </Button>
    </List>
  );
};

export default ChatList;
