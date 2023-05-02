import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import '../../css/home.css';
import Header from "./component/header";
import SideBar from "./component/sidebar";
import { message } from "antd";
import { useEffect } from "react";

export const Main = () => {
  const nav = useNavigate();
  useEffect(() => {
    const isLogined = localStorage.getItem("token");
    if (!isLogined) {
      nav("/login");
      message.error("Vui lòng đăng nhập lại.");
    }
  }, []);
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
