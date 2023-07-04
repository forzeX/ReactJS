import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./InputField.css";
import TextField from "@mui/material/TextField";
import { red } from "@mui/material/colors";

const primary = red[500];

const InputField = ({ text, setText }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };
  const inputElement = useRef();
  return (
    <TextField
      name="inputField"
      type="text"
      autoComplete="off"
      value={text}
      onChange={handleChange}
      className="input-block__input-field"
      autoFocus
      variant="standard"
      fullWidth
      color="primary"
      sx={{ pb: 0 }}
    />
  );
};

export default InputField;
