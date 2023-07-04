import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { AUTHORS } from "../../../../Utils/Constants";
import "./Message.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../../../Store/messages/actions";
import { useParams } from "react-router-dom";

const Message = ({ author, text, id }) => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const handleClick = () => {
    dispatch(deleteMessage(chatId, id));
  };
  return (
    <div
      className={`message ${
        author === AUTHORS.BOT ? "bot-message" : "human-message"
      }`}
    >
      <div className="message-text">{text}</div>
      <div className="message-sender">{author}</div>
      <IconButton
        className="controls"
        size="small"
        sx={{
          w: "max-content",
          m: "0 0 0 5px",
          justifySelf: "flex-end",
          color: "#1976d2",
        }}
        onClick={handleClick}
      >
        <DeleteIcon fontSize="inherit"></DeleteIcon>
      </IconButton>
    </div>
  );
};

export default Message;
