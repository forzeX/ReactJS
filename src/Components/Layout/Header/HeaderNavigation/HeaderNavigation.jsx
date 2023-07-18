import * as React from "react";
import HeaderNavigationItem from "./HeaderNavigationItem/HeaderNavigationItem";

const HeaderNavigation = () => {
  return (
    <div className="header__navigation">
      <HeaderNavigationItem link={"/"} text={"Home"}></HeaderNavigationItem>
      <HeaderNavigationItem
        link={"/profile"}
        text={"Profile"}
      ></HeaderNavigationItem>
    </div>
  );
};

export default HeaderNavigation;
