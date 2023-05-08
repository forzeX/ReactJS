import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header/Header";
import ChatList from "./ChatList/ChatList";
import MessageField from "./MessageField/MessageField";
import InputForm from "./InputForm/InputForm";
import { AUTHORS } from "../../Utils/Constants";
import "./Layout.css";

const Layout = () => {
  let initialMessages = [
    { author: AUTHORS.HUMAN, text: "Привет" },
    { author: AUTHORS.HUMAN, text: "Как дела?" },
  ];
  const [messages, updateMessages] = useState(initialMessages);

  const handleAddMessage = (message) => {
    updateMessages((messages) => [...messages, message]);
  };

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].author !== AUTHORS.BOT
    ) {
      handleAddMessage({
        author: AUTHORS.BOT,
        text: "Не приставай ко мне. Я - робот!",
      });
    }
  }, [messages]);

  return (
    <div className="layout">
      <Header />
      <ChatList />
      <MessageField messages={messages} updateMessages={updateMessages} />
      <InputForm onAddMessage={handleAddMessage} />
    </div>
  );
};

export default Layout;
