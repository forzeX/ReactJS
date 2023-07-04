import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams, Route, Outlet } from "react-router-dom";
import Header from "./Header/Header";
import ChatList from "./ChatList/ChatList";
import MessageField from "./MessageField/MessageField";
import InputForm from "./InputForm/InputForm";
import { AUTHORS } from "../../Utils/Constants";
import "./Layout.css";

const Layout = () => {
  const initialMessages = {
    1: {
      title: "Чат 1",
      storage: [
        { author: AUTHORS.HUMAN, text: "Привет" },
        { author: AUTHORS.HUMAN, text: "Как дела?" },
      ],
    },
    2: {
      title: "Чат 2",
      storage: [
        { author: AUTHORS.HUMAN, text: "Привет" },
        { author: AUTHORS.HUMAN, text: "Как дела?" },
      ],
    },
    3: {
      title: "Чат 3",
      storage: [
        { author: AUTHORS.HUMAN, text: "Привет" },
        { author: AUTHORS.HUMAN, text: "Как дела?" },
      ],
    },
    4: {
      title: "Чат 4",
      storage: [
        { author: AUTHORS.HUMAN, text: "Привет" },
        { author: AUTHORS.HUMAN, text: "Как дела?" },
      ],
    },
    5: {
      title: "Чат 5",
      storage: [
        { author: AUTHORS.HUMAN, text: "Привет" },
        { author: AUTHORS.HUMAN, text: "Как дела?" },
      ],
    },
  };

  const [messages, updateMessages] = useState(initialMessages);

  let { chatId } = useParams();

  const handleAddMessage = useCallback(
    (message) => {
      updateMessages((messages) => ({
        ...messages,
        [chatId]: {
          title: messages[chatId].title,
          storage: [...messages[chatId].storage, message],
        },
      }));
    },
    [chatId]
  );

  useEffect(() => {
    if (
      // Используем опциональную цепочку для проверки наличия chatId
      messages[chatId]?.storage.length > 0 &&
      messages[chatId].storage[messages[chatId].storage.length - 1].author !==
        AUTHORS.BOT
    ) {
      handleAddMessage({
        author: AUTHORS.BOT,
        text: "Не приставай ко мне. Я - робот!",
      });
    }
  }, [messages]);

  const handleAddChat = useCallback(() => {
    const newChatId = Object.keys(messages).length + 1;
    updateMessages((messages) => ({
      ...messages,
      [newChatId]: {
        title: `Чат ${newChatId}`,
        storage: [],
      },
    }));
  }, [messages]);

  const title = messages[chatId]?.title;

  const contextValue = {
    messages: messages[chatId]?.storage,
    onAddMessage: handleAddMessage,
  };

  const chats = Object.entries(messages);

  return (
    <div className="layout">
      <Header title={title} />
      <ChatList chats={chats} onAddMessage={handleAddChat} />
      <Outlet context={contextValue} />
    </div>
  );
};

export default Layout;
