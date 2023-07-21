import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import ChatList from "./ChatList/ChatList";
import MessageField from "./MessageField/MessageField";
import InputForm from "./InputForm/InputForm";
import { AUTHORS } from "../../Utils/Constants";
import "./Layout.css";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { dispatch } from "rxjs/internal/observable/pairs";
import { toggleVisibility } from "../../Store/chats/actions";

const Layout = () => {
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
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile & !location.pathname.includes("/chats") & activatedMessages) {
      dispatch(toggleVisibility());
    }
  }, [location]);

  return (
    <div className={`layout` + (isMobile ? `${hasActiveComponent()}` : ``)}>
      <ChatList />
      <Outlet />
    </div>
  );
};

export default Layout;
