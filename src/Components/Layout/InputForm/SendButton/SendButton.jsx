import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";

const SendButton = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <Fab
      sx={{ ml: 1 }}
      size="small"
      className="input-field__send-button"
      color="primary"
      type="submit"
    >
      <SendIcon fontSize="small" />
    </Fab>
  );
};

export default SendButton;
