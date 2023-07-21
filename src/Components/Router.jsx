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
import ErrorPage from "./ErrorPage/ErrorPage";
import Header from "./Layout/Header/Header";
import InstallPopup from "./InstallPopup/InstallPopup";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: (
          <>
            <Layout />
            <InstallPopup />
          </>
        ),
        children: [
          {
            path: "/chats/:chatId?",
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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default Router;
