import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Message from "./Message/Message";

const MessageField = ({ messages, updateMessages }) => {
  const MessagesList = () => {
    messages.map((message, index) => (
      <Message key={index} author={message.author} text={message.text} />
    ));
  };

  return (
    <>
      <div>
        {messages.map((message, index) => (
          <Message key={index} author={message.author} text={message.text} />
        ))}
      </div>
    </>
  );
};

export default MessageField;
