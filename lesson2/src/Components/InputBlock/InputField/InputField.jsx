import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const InputField = ({ text, setText }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  return (
    <input name="inputField" type="text" value={text} onChange={handleChange} />
  );
};

export default InputField;
