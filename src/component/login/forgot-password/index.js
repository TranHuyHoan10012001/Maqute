/* eslint-disable jsx-a11y/alt-text */
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import "../../../css/login.css";
import loginImage from "../../../image/loginImageLeft.jpg";

const ForgotPassword = () => {
  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
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
          <h1>Quên mật khẩu</h1>
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
            className="code"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{ fontWeight: "bold", marginBottom: 8, marginTop: 20 }}
            >
              Mã xác nhận
            </label>
            <Space direction="vertical">
              <Input
                placeholder="Vui lòng nhập mã xác nhận"
                prefix={<LockOutlined />}
                style={{ minWidth: 400 }}
                value={password}
                onChange={(e) => onChangePassword(e.target.value)}
              />
            </Space>
            <div className="errorLogin">{errorMessage}</div>
            <a href="#" style={{ marginTop: 9 }}>
              Gửi lại mã xác nhận
            </a>
          </div>
        </form>

        <Button
          type="primary"
          htmlType="submit"
          onClick={onSubmit}
          style={{ width: "30%" }}
        >
          Xác nhận mật khẩu
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
