import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Alert, Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import "../../../css/login.css";
import loginImage from "../../../image/loginImageLeft.jpg";
export const ChangePassword = () => {
  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value) => setPassword(value);
  const onChangePasswordConfirm = (value) => setPasswordConfirm(value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitRegister = async (e) => {
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
  };

  useEffect(() => {
    if (password && password !== passwordConfirm) setIsMatchPassword(false);
    else setIsMatchPassword(true);
  }, [password, passwordConfirm]);

  return (
    <div className="loginContainer" style={{ display: "flex" }}>
      <div className="leftPath" style={{ width: "50%", height: "100%" }}>
        <img
          alt="loginImage"
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
          <h1>Thay đổi mật khẩu</h1>
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
              Mật khẩu cũ
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
            className="password"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{ fontWeight: "bold", marginBottom: 8, marginTop: 20 }}
            >
              Mật khẩu mới
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
          Thay đổi mật khẩu
        </Button>
      </div>
    </div>
  );
};
