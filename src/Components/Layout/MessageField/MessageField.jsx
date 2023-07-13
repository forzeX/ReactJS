import React, { useCallback, useEffect } from "react";
import Message from "./Message/Message";
import "./MessageField.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, getMessages } from "../../../Store/messages/actions";
import { AUTHORS } from "../../../Utils/Constants";

const MessageField = () => {
  const { chatId } = useParams();
  const messages = useSelector((state) => state.messages.messagesList);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getMessages(dispatch);
  }, []);

  useEffect(() => {
    if (!chatId || !messages[chatId]) {
      navigate("/");
    }
  });

  return (
    <div className="message-field-wrapper">
      <div className="message-field">
        {messages[chatId]?.map((message, index) => (
          <Message
            key={index}
            author={message.author}
            text={message.text}
            id={message.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageField;
