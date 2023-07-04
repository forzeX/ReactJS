import React, { useState } from "react";
import Message from "./Message/Message";
import "./MessageField.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MessageField = () => {
  // const { messages } = useOutletContext();
  const { chatId } = useParams();
  // const messages = useSelector((state) => state.chatsStorage[chatId].storage);
  const messages = useSelector((state) => state.chatsStorage[chatId].storage);

  return (
    <div className="message-field-wrapper">
      <div className="message-field">
        {messages.map((message, index) => (
          <Message key={index} author={message.author} text={message.text} />
        ))}
      </div>
    </div>
  );
};

export default MessageField;
