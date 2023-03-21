import React from "react";
import { Outlet } from "react-router-dom";
import '../../css/home.css';
import Header from "./component/header";
import SideBar from "./component/sidebar";

export const Main = () => {
  return (
    <div className="">
      <Header />
      <div className="container">
        <SideBar />
        <div className="management-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
};
