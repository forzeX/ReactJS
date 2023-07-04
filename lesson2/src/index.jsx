import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import MessageField from "./Components/MessageField/MessageField";
import InputBlock from "./Components/InputBlock/InputBlock";

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

  return (
    <>
      <MessageField messages={messages} updateMessages={updateMessages} />
      <InputBlock messages={messages} updateMessages={updateMessages} />
    </>
  );
};

root.render(<App />);
