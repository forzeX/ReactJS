import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Profile from "./Layout/Profile/Profile";
import MessageField from "./Layout/MessageField/MessageField";
import InputForm from "./Layout/InputForm/InputForm";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/chats/:chatId",
        element: (
          <>
            <MessageField />
            <InputForm />
          </>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default Router;
