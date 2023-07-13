import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import SendButton from "./SendButton/SendButton";
import InputField from "./InputField/InputField";
import { AUTHORS } from "../../../Utils/Constants";
import "./InputForm.css";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../Store/messages/actions";

const InputBlock = () => {
  const { chatId } = useParams();

  const dispatch = useDispatch();

  const handleAddMessage = useCallback(
    (message) => {
      dispatch(addMessage(message, chatId));
    },
    [chatId, dispatch]
  );

  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddMessage({
      author: AUTHORS.HUMAN,
      text: text,
      id: Date.now().toString(),
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
