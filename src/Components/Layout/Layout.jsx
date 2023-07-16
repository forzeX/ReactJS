import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams, Route, Outlet } from "react-router-dom";
import Header from "./Header/Header";
import ChatList from "./ChatList/ChatList";
import MessageField from "./MessageField/MessageField";
import InputForm from "./InputForm/InputForm";
import { AUTHORS } from "../../Utils/Constants";
import "./Layout.css";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Layout = () => {
  // const store = useSelector((state) => state.chatsStorage);
  // const [messages, updateMessages] = useState(store);

  // let { chatId } = useParams();
  // const dispatch = useDispatch();

  // const handleAddMessage = (message) => {
  //   dispatch(addMessage(message.text, message.author, chatId));
  // };

  // (ТРЕБУЕТ ДОРАБОТКИ) Добавляем автоматический ответ от бота при отправке сообщения человеком

  // useEffect(() => {
  //   if (
  //     // Используем опциональную цепочку для проверки наличия chatId
  //     messages[chatId]?.storage.length > 0 &&
  //     messages[chatId].storage[messages[chatId].storage.length - 1].author !==
  //       AUTHORS.BOT
  //   ) {
  //     console.log(messages);
  //     handleAddMessage({
  //       author: AUTHORS.BOT,
  //       text: "Не приставай ко мне. Я - робот!",
  //     });
  //   }
  // }, [messages[chatId]?.storage]);

  const isMobile = useMediaQuery({ query: "(max-width: 1079px)" });
  const activatedChat = useSelector((state) => state.chats.isActive);
  const activatedMessages = useSelector((state) => state.messages.isActive);
  const hasActiveComponent = () => {
    if (activatedChat) {
      return ` chats-active`;
    } else {
      return ` messages-active`;
    }
  };

  return (
    <div className={`layout` + (isMobile ? `${hasActiveComponent()}` : ``)}>
      <ChatList />
      <Outlet />
    </div>
  );
};

export default Layout;
