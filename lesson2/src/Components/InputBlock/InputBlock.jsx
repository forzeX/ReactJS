import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import SendButton from "./SendButton/SendButton";
import InputField from "./InputField/InputField";

const InputBlock = ({ messages, updateMessages }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    // const form = event.target;
    // const formData = new FormData(form);
    // const formObject = Object.fromEntries(formData.entries());
    // const inputValue = formObject.inputField;
    event.preventDefault();

    updateMessages([
      ...messages,
      {
        text: text,
        author: "Я",
      },
    ]);
    setText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField text={text} setText={setText} />
        <SendButton />
      </form>
    </>
  );
};

export default InputBlock;
