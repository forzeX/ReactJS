import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import SendIcon from "@mui/icons-material/Send";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import PushToggle from "./PushToggle/PushToggle";
import { getProfileData } from "../../../Store/profile/actions";

const Header = () => {
  const profileLogin = useSelector((store) => store.profile.profileData.login);

  const dispatch = useDispatch();

  useEffect(() => {
    getProfileData(dispatch);
  }, []);

  return (
    <>
      <div className="header">
        <PushToggle />
        <h1 style={{ gridArea: "logo" }}>
          <SendIcon variant="outlined" sx={{ mr: 1 }} />
          Messenger
        </h1>
        <HeaderNavigation></HeaderNavigation>
        <div className="header__user-name">{profileLogin}</div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
