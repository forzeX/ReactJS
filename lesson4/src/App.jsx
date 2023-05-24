import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Components/Router";

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
