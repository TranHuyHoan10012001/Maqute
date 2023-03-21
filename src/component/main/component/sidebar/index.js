import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LIST_MENU_SIDEBAR from './constant';
import "../../../../css/sidebar.css"

const SideBar = () => {
  const params = new URL(window.location.href);

  const [activeTab, setActiveTab] = useState("");
  
  useEffect(() => {
    LIST_MENU_SIDEBAR.forEach((item) => {
      if (params.pathname.startsWith(item?.link)) {
        setActiveTab(item.key);
        return;
      }
    })
  }, [params.pathname])

  return (
    <div className="sidebar-container">
      <Menu
        defaultOpenKeys={[activeTab]}
        selectedKeys={[activeTab]}
        mode="inline"
      >
        {
          LIST_MENU_SIDEBAR.map((itemMenu, index) => {
            return (
              <Menu.Item key={itemMenu.key} onClick={() => setActiveTab(itemMenu.key)}>
                <span>{itemMenu.label}</span>
                <Link to={itemMenu.link} />
              </Menu.Item>
            )
          })
        }
      </Menu>
    </div>
  );
};

export default SideBar;