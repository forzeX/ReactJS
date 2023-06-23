import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams, Route, Outlet } from "react-router-dom";
import Header from "./Header/Header";
import ChatList from "./ChatList/ChatList";
import MessageField from "./MessageField/MessageField";
import InputForm from "./InputForm/InputForm";
import { AUTHORS } from "../../Utils/Constants";
import "./Layout.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGE, addMessage } from "../../Store/actions";

const Layout = () => {
  const store = useSelector((state) => state);
  // const [messages, updateMessages] = useState(initialMessages);
  const [messages, updateMessages] = useState(store);

  let { chatId } = useParams();
  const dispatch = useDispatch();

  // const handleAddMessage = useCallback(
  //   (message) => {
  //     updateMessages((messages) => ({
  //       ...messages,
  //       [chatId]: {
  //         title: messages[chatId].title,
  //         storage: [...messages[chatId].storage, message],
  //       },
  //     }));
  //   },
  //   [chatId]
  // );

  const handleAddMessage = (message) => {
    dispatch(addMessage(message.text, message.author, chatId));
  };

  // Проверка доступности хранилища сообщений в чате {chatId}
  console.log(messages[chatId].storage);

  // (ТРЕБУЕТ ДОРАБОТКИ) Добавляем автоматический ответ от бота при отправке сообщения человеком
  // useEffect(() => {
  //   if (
  //     // Используем опциональную цепочку для проверки наличия chatId
  //     messages[chatId]?.storage.length > 0 &&
  //     messages[chatId].storage[messages[chatId].storage.length - 1].author !==
  //       AUTHORS.BOT
  //   ) {
  //     handleAddMessage({
  //       author: AUTHORS.BOT,
  //       text: "Не приставай ко мне. Я - робот!",
  //     });
  //   }
  // }, [messages[chatId].storage]);

  // Не потребуется. Оставлено для образца
  // const handleAddChat = useCallback(() => {
  //   const newChatId = Object.keys(messages).length + 1;
  //   updateMessages((messages) => ({
  //     ...messages,
  //     [newChatId]: {
  //       title: `Чат ${newChatId}`,
  //       storage: [],
  //     },
  //   }));
  // }, [messages]);

  // Не потребуется. Оставлено для образца
  // const title = messages[chatId]?.title;
  const title = store[chatId]?.title;

  // Не потребуется. Оставлено для образца
  // const contextValue = {
  //   messages: messages[chatId]?.storage,
  //   onAddMessage: handleAddMessage,
  // };

  const contextValue = {
    messages: store[chatId]?.storage,
    onAddMessage: handleAddMessage,
  };

  // const chats = Object.entries(messages);
  // const chats = Object.entries(store);

  return (
    <div className="layout">
      <Header title={title} />
      <ChatList />
      <Outlet context={contextValue} />
    </div>
  );
};

export default Layout;
