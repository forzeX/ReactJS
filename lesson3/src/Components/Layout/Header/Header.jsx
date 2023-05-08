import React from "react";
import ReactDOM from "react-dom/client";
import SendIcon from "@mui/icons-material/Send";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>
        <SendIcon variant="outlined" sx={{ mr: 1 }} />
        Messenger
      </h1>
    </div>
  );
};

export default Header;
