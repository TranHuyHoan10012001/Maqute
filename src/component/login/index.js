/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.css";
import loginImage from "../../image/loginImageLeft.jpg";
import { handleUserLoginApi } from "../../services/userServices";
import { useContext } from "react";
import { Context } from "../../context";

export const Login = () => {
  const context = useContext(Context);
  const openNotification = () => {
    const args = {
      message: "Thông báo",
      description: "Đăng nhập thành công",
      duration: 1,
    };
    notification.open(args);
  };
  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    try {
      let userData = await handleUserLoginApi(email, password);
      if (userData && userData.errorCode !== 0)
        setErrorMessage(userData.message);

      if (userData && userData.errorCode === 0) {
        navigate("/");
        console.log("userData: ", userData);
        context.setUser(userData.user);
        openNotification();
        localStorage.setItem("token", userData?.token);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
    console.log(errorMessage);
  };

  return (
    <div className="loginContainer" style={{ display: "flex" }}>
      <div className="leftPath" style={{ width: "50%", height: "100%" }}>
        <img
          src={loginImage}
          style={{
            borderRadius: "0 50% 50% 0%",
            maxWidth: "100%",
            minHeight: "47em",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        className="rightPath"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "50%",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="header" style={{ display: "flex" }}>
          <h1>Đăng nhập</h1>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          <div
            className="email"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label style={{ fontWeight: "bold", marginBottom: 8 }}>Email</label>
            <Space direction="vertical">
              <Input
                placeholder="Vui lòng nhập email"
                prefix={<MailOutlined />}
                style={{ minWidth: 400 }}
                value={email}
                onChange={(e) => onChangeEmail(e.target.value)}
              />
            </Space>
          </div>
          <div
            className="password"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{ fontWeight: "bold", marginBottom: 8, marginTop: 20 }}
            >
              Mật khẩu
            </label>
            <Space direction="vertical">
              <Input.Password
                placeholder="Vui lòng nhập mật khẩu"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ minWidth: 400 }}
                value={password}
                onChange={(e) => onChangePassword(e.target.value)}
              />
            </Space>
            <div className="errorLogin">{errorMessage}</div>
            <a href="/forgotPassword" style={{ marginTop: 9 }}>
              Quên mật khẩu
            </a>
          </div>
        </form>

        <Button
          type="primary"
          htmlType="submit"
          onClick={onSubmit}
          style={{ width: "30%" }}
        >
          Đăng nhập
        </Button>
        <div className="registerQuestion" style={{ marginTop: 15 }}>
          Nếu chưa có tài khoản?
          <a href="/register"> Đăng kí tài khoản</a>
        </div>
      </div>
    </div>
  );
};
