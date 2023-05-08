import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Message from "./Message/Message";
import "./MessageField.css";

const MessageField = ({ messages }) => {
  return (
    <div className="message-field">
      {messages.map((message, index) => (
        <Message key={index} author={message.author} text={message.text} />
      ))}
    </div>
  );
};

export default MessageField;
