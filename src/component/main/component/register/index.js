/* eslint-disable jsx-a11y/alt-text */
import { Button, Input, Space, Alert, notification } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../../../image/loginImageLeft.jpg";
import "../../../../css/login.css";
import { handleUserRegisterApi } from "../../../../services/userServices";

export const Resgister = () => {
  const openNotification = () => {
    const args = {
      message: "Thông báo",
      description: "Đăng ký tài khoản thành công",
      duration: 1,
    };
    notification.open(args);
  };
  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);
  const onChangePasswordConfirm = (value) => setPasswordConfirm(value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      let newUserData = await handleUserRegisterApi(
        email,
        password,
        firstName,
        lastName
      );
      console.log("newUserData: ", newUserData);
      if (newUserData && newUserData.errorCode !== 0) {
        setErrorMessage(newUserData.message);
      }
      if (newUserData && newUserData.errorCode === 0) {
        openNotification();
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    if (password && password !== passwordConfirm) setIsMatchPassword(false);
    else setIsMatchPassword(true);
  }, [password, passwordConfirm]);

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
          <h1>Đăng kí tài khoản</h1>
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
            className="firstName"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "5px",
            }}
          >
            <label style={{ fontWeight: "bold", marginBottom: 8 }}>Họ</label>
            <Space direction="vertical">
              <Input
                placeholder="Vui lòng nhập họ"
                style={{ minWidth: 400 }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Space>
          </div>
          <div
            className="lastName"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "5px",
            }}
          >
            <label style={{ fontWeight: "bold", marginBottom: 8 }}>Tên</label>
            <Space direction="vertical">
              <Input
                placeholder="Vui lòng nhập tên"
                style={{ minWidth: 400 }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
          </div>
          <div
            className="passwordConfirm"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{ fontWeight: "bold", marginBottom: 8, marginTop: 20 }}
            >
              Xác thực mật khẩu
            </label>
            <Space direction="vertical">
              <Input.Password
                placeholder="Xác thực nhập mật khẩu"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ minWidth: 400 }}
                value={passwordConfirm}
                onChange={(e) => onChangePasswordConfirm(e.target.value)}
              />

              {isMatchPassword ? (
                <Alert message="Mật khẩu trùng khớp" type="success" showIcon />
              ) : (
                <Alert message="Mật khẩu không khớp" type="error" showIcon />
              )}
            </Space>
          </div>
          <div className="errorMessage">{errorMessage}</div>
        </form>
        <Button
          type="primary"
          htmlType="submit"
          onClick={onSubmitRegister}
          style={{ width: "30%" }}
          disabled={!isMatchPassword || !passwordConfirm || !email}
        >
          Đăng kí
        </Button>
      </div>
    </div>
  );
};
