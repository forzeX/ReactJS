import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./InputField.css";

const InputField = ({ text, setText }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  return (
    <input
      name="inputField"
      type="text"
      value={text}
      onChange={handleChange}
      className="input-block__input-field"
    />
  );
};

export default InputField;
