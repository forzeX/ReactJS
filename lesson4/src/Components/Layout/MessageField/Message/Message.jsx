import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { AUTHORS } from "../../../../Utils/Constants";
import "./Message.css";

const Message = ({ author, text }) => (
  <div
    className={`message ${
      author === AUTHORS.BOT ? "bot-message" : "human-message"
    }`}
  >
    <div>{text}</div>
    <div className="message-sender">{author}</div>
  </div>
);

export default Message;
