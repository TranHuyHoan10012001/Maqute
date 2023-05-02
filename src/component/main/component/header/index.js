import React, { useState } from "react";
import "../../../../css/header.css";
import logoIcon from "../../../../image/logo.svg";
import {
  SettingOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../../context";

const Header = () => {
  const context = useContext(Context);
  const [showDetailSetting, setShowDetaiSetting] = useState(false);
  const onClickSetting = () => {
    setShowDetaiSetting(!showDetailSetting);
    if (showDetailSetting)
      console.log("setShowDetaiSetting: ", showDetailSetting);
  };
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="logo">
        <img src={logoIcon} alt="" />
        <div className="app-name">MAQUTE</div>
      </div>
      <div className="logout">
        <div className="avatar">{context?.user?.firstName[0]}</div>
        <div className="setting" onClick={onClickSetting}>
          <SettingOutlined
            style={{ fontSize: 40, paddingLeft: 10, paddingRight: 10 }}
          />
          {showDetailSetting && (
            <div className="detailSetting">
              <div
                className="editInfo"
                style={{
                  gap: 5,
                  display: "flex",
                  alignItems: "center",
                  borderBottomStyle: "groove",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "red",
                  },
                }}
              >
                <EditOutlined />
                Chỉnh sửa thông tin
              </div>
              <div
                className="logoutIcon"
                style={{
                  gap: 5,
                  display: "flex",
                  alignItems: "center",
                  borderBottomStyle: "groove",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                <LogoutOutlined />
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
