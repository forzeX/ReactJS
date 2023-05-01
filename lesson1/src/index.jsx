import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const App = (props) => {
  let messages = ["Привет", "Как дела?"];

  const [initialMessages, updateMessages] = useState(messages);

  const MessageComponent = (props) => <div>{props.text}</div>;

  const MessageField = (props) => {
    return props.messages.map((message) => <MessageComponent text={message} />);
  };

  const SendButton = (props) => {
    const sendMessage = () => {
      updateMessages([...initialMessages, "Нормально!"]);
    };
    return <button onClick={sendMessage}>Отправить</button>;
  };

  return (
    <div>
      <MessageField messages={initialMessages} />
      <SendButton messages={initialMessages} />
    </div>
  );
};

root.render(<App />);
