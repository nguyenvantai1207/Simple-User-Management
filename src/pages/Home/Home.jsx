import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Layout, { Content, Header } from "antd/es/layout/layout";
import { Button, Menu, Popconfirm, notification, theme } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import "./Home.css";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey("1");
        break;
      case "/employee":
        setSelectedKey("2");
        break;
      case "/insert":
        setSelectedKey("3");
        break;
      default:
        setSelectedKey("1");
        navigate("/");
        break;
    }
  }, [location.pathname, navigate]);

  const confirm = () => {
    api.open({
      message: "Logging out",
      description: `You will log out in ${3} seconds!`,
      duration: 3,
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };
  const cancel = () => {};

  return (
    // Layout
    <Layout>
      {contextHolder}
      {/* Sider */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          className="navbar"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              icon: <OrderedListOutlined />,
              label: <Link to="/employee">List</Link>,
            },
            {
              key: "3",
              icon: <UserAddOutlined />,
              label: <Link to="/insert">Insert</Link>,
            },
            {
              key: "4",
              danger: true,
              icon: (
                <Popconfirm
                  title="Log out"
                  description="Are you sure to log out this page?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <LogoutOutlined />
                </Popconfirm>
              ),
              label: (
                <Popconfirm
                  title="Log out"
                  description="Are you sure to log out this page?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  Log out
                </Popconfirm>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        {/* header */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 64,
              height: 64,
            }}
          />
        </Header>
        {/* content */}
        <Content
          style={{
            margin: "20px 16px",
            padding: "24px",
            minHeight: "800px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
