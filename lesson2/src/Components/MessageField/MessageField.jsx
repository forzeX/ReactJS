import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Message from "./Message/Message";

const MessageField = (props) => {
  return props.messages.map((message, index) => (
    <Message key={index} author={message.author} text={message.text} />
  ));
};

export default MessageField;
