import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import SendButton from "./SendButton/SendButton";
import InputField from "./InputField/InputField";
import { AUTHORS } from "../../../Utils/Constants";
import "./InputForm.css";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../Store/messages/actions";
import { useMediaQuery } from "react-responsive";

const InputBlock = () => {
  const { chatId } = useParams();
  console.log(chatId);

  const dispatch = useDispatch();

  const handleAddMessage = useCallback(
    (message) => {
      dispatch(addMessage(message, chatId));
    },
    [chatId, dispatch]
  );

  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    console.log(chatId);
    event.preventDefault();
    handleAddMessage({
      author: AUTHORS.HUMAN,
      text: text,
      id: Date.now().toString(),
    });
    setText("");
  };

  const isActive = useSelector((state) => state.messages.isActive);
  const isMobile = useMediaQuery({ query: "(max-width: 1079px)" });

  if (isMobile & !isActive) {
    return;
  } else {
    return (
      <>
        <form className="input-form" onSubmit={handleSubmit}>
          <InputField text={text} setText={setText} />
          <SendButton />
        </form>
      </>
    );
  }
};

export default InputBlock;
