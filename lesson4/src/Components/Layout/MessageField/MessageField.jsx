import React, { useState } from "react";
import Message from "./Message/Message";
import "./MessageField.css";
import { useOutletContext } from "react-router-dom";

const MessageField = () => {
  const { messages } = useOutletContext();

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
