import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Message = (props) => (
  <div>
    {props.author}:{props.text}
  </div>
);

export default Message;
