import React from "react";
import ReactDOM from "react-dom/client";
import SendIcon from "@mui/icons-material/Send";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const profileLogin = useSelector((store) => store.profileData.login);
  // const userName = store.profileName;

  return (
    <div className="header">
      <h1>
        <SendIcon variant="outlined" sx={{ mr: 1 }} />
        Messenger
      </h1>
      <HeaderNavigation></HeaderNavigation>
      <div className="header__user-name">{profileLogin}</div>
    </div>
  );
};

export default Header;
