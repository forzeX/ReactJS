import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useOutletContext } from "react-router-dom";
import SendButton from "./SendButton/SendButton";
import InputField from "./InputField/InputField";
import { AUTHORS } from "../../../Utils/Constants";
import "./InputForm.css";

const InputBlock = () => {
  const { onAddMessage } = useOutletContext();
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddMessage({
      text,
      author: AUTHORS.HUMAN,
    });
    setText("");
  };

  return (
    <>
      <form className="input-form" onSubmit={handleSubmit}>
        <InputField text={text} setText={setText} />
        <SendButton />
      </form>
    </>
  );
};

export default InputBlock;
