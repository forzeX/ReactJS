import React from "react";
import ReactDOM from "react-dom/client";
import ChatListItem from "./ChatListItem/ChatListItem";
import List from "@mui/material/List";
import "./ChatList.css";

const ChatList = () => {
  const chatListArray = ["Chat1", "Chat2", "Chat3", "Chat4", "Chat5"];
  return (
    <List className="chat-list">
      {chatListArray.map((item, index) => (
        <ChatListItem key={index} text={item} />
      ))}
    </List>
  );
  console.log(chatListArray);
};

export default ChatList;
