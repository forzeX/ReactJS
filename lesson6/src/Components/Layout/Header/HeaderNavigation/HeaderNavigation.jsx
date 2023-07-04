import * as React from "react";
import HeaderNavigationItem from "./HeaderNavigationItem/HeaderNavigationItem";

const HeaderNavigation = () => {
  return (
    <>
      <HeaderNavigationItem link={"/"} text={"Home"}></HeaderNavigationItem>
      <HeaderNavigationItem
        link={"/profile"}
        text={"Profile"}
      ></HeaderNavigationItem>
    </>
  );
};

export default HeaderNavigation;
