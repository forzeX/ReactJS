import * as React from "react";
import HeaderNavigationItem from "./HeaderNavigationItem/HeaderNavigationItem";

const HeaderNavigation = () => {
  return (
    <>
      <HeaderNavigationItem link={"/"} text={"Home"} />
      <HeaderNavigationItem link={"/profile"} text={"Profile"} />
      <HeaderNavigationItem link={"/articles"} text={"Articles"} />
    </>
  );
};

export default HeaderNavigation;
