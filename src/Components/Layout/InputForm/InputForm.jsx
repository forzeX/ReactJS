import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useOutletContext, useParams } from "react-router-dom";
import SendButton from "./SendButton/SendButton";
import InputField from "./InputField/InputField";
import { AUTHORS } from "../../../Utils/Constants";
import "./InputForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../Store/actions";

const InputBlock = () => {
  // const { onAddMessage } = useOutletContext();
  const { chatId } = useParams();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddMessage = (message) => {
    dispatch(addMessage(message.text, message.author, chatId));
  };

  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddMessage({ text: text, author: AUTHORS.HUMAN });
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
