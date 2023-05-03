import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Message from "./MessageField/Message/Message";
import MessageField from "./MessageField/MessageField";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const App = (props) => {
  let initialMessages = [
    { author: "User1", text: "Привет" },
    { author: "User1", text: "Как дела?" },
  ];
  const [messages, updateMessages] = useState(initialMessages);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].author !== "Робот"
    ) {
      setTimeout(
        () =>
          updateMessages([
            ...messages,
            {
              author: "Робот",
              text: "Не приставай ко мне. Я - робот!",
            },
          ]),
        1000
      );
    }
  }, [messages]);

  const SendButton = (props) => {
    const handleClick = () => {
      updateMessages([...messages, { text: "Нормально!", author: "Я" }]);
    };

    return <button onClick={handleClick}>Отправить</button>;
  };

  return (
    <>
      <MessageField messages={messages} />
      <SendButton messages={messages} />
    </>
  );
};

root.render(<App />);
