import React from "react";
import NavBar from "./navBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
