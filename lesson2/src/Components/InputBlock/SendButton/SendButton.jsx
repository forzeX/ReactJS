import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const SendButton = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };
  return <button type="submit">Отправить</button>;
};

export default SendButton;
