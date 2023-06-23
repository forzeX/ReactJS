import React from "react";
import ReactDOM from "react-dom/client";
import SendIcon from "@mui/icons-material/Send";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <div className="header">
      <h1>
        <SendIcon variant="outlined" sx={{ mr: 1 }} />
        Messenger
      </h1>
      <HeaderNavigation></HeaderNavigation>
      <div className="header__chat-title">{title}</div>
    </div>
  );
};

export default Header;
