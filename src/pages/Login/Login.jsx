import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
  notification,
} from "antd";
import { Content } from "antd/es/layout/layout";
import "./Login.css";
import {
  FacebookOutlined,
  InstagramOutlined,
  MehOutlined,
  SmileOutlined,
  StopOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import userService from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const userObject = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(userObject);
  const [userList, setUserList] = useState([
    {
      username: "",
      password: "",
    },
  ]);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [componentDisabled, setComponentDisabled] = useState(false);

  const fetchUserList = async () => {
    try {
      const response = await userService.getAll();
      setUserList(response.data);
    } catch (error) {
      console.log("Error fetch userList: ", error);
    }
  };

  // Handle Compare
  const handleCompare = (formData, userList) => {
    return userList.some(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );
  };

  let attempts = 1;
  let block = false;

  // Handle Submit
  const handleSubmit = () => {
    if (handleCompare(formData, userList)) {
      api.info({
        message: "Success",
        description: `Login Successfully! Welcome ${formData.username}`,
        duration: 2,
        icon: (
          <SmileOutlined
            style={{
              color: "#108ee9",
            }}
          />
        ),
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    } else {
      if (attempts <= 3 && !block) {
        api.info({
          message: "Error",
          description:
            "Login Failed. Username or password may be incorrect. Please check and try again.",
          duration: 2.5,
          icon: (
            <MehOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
      } else {
        block = true;
      }
      attempts++;
      if (attempts > 3 && block) {
        api.info({
          message: "Error",
          description: "You attempted to login over 3 times!",
          duration: 2.5,
          icon: (
            <StopOutlined
              style={{
                color: "#C41E3A",
              }}
            />
          ),
        });
        setComponentDisabled(true);
        return;
      }
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="login"
      style={{
        background: "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {contextHolder}
      <Layout
        style={{
          width: "1000px",
          height: "700px",
          margin: "100px auto",
          boxShadow: "0 0 30px #C676C4",
        }}
      >
        <Flex>
          <Content>
            <img
              src="https://images.unsplash.com/photo-1635492491273-455af7728453?q=80&w=1860&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              style={{
                height: "100%",
                width: "500px",
                objectFit: "cover",
              }}
            />
          </Content>
          <Content
            style={{
              height: "700px",
              position: "relative",
            }}
          >
            <Form
              name="basic"
              disabled={componentDisabled}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                height: 700,
                padding: "100px 20px",
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Form.Item
                wrapperCol={{
                  offset: 2,
                  span: 16,
                }}
                style={{
                  lineHeight: "60px",
                }}
              >
                <p
                  style={{
                    fontSize: "70px",
                  }}
                >
                  Hello,
                </p>
                <p
                  style={{
                    fontSize: "90px",
                    fontWeight: "bold",
                  }}
                >
                  welcome!
                </p>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 2,
                  // span: ,
                }}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Username"
                  style={{ borderRadius: "0" }}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 2,
                  // span: 16,
                }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  style={{ borderRadius: "0" }}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 2,
                  span: 16,
                }}
              >
                <Checkbox style={{ fontSize: "16px" }}>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 2,
                  span: 16,
                }}
              >
                <div className="button-container">
                  <Space>
                    <Button
                      type="primary"
                      className="login-button"
                      htmlType="submit"
                      onClick={handleSubmit}
                      size="large"
                    >
                      Sign in
                    </Button>
                    <Button
                      type="primary"
                      className="signup-button"
                      // htmlType="submit"
                      size="large"
                    >
                      <Link to="/register">Sign up</Link>
                    </Button>
                  </Space>
                </div>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 2,
                  span: 16,
                }}
              >
                <div className="social">
                  <Space size="large">
                    <p>Follow</p>
                    <a href="#">
                      <FacebookOutlined />
                    </a>
                    <a href="#">
                      <TwitterOutlined />
                    </a>
                    <a href="#">
                      <InstagramOutlined />
                    </a>
                  </Space>
                </div>
              </Form.Item>
            </Form>
          </Content>
        </Flex>
      </Layout>
    </div>
  );
};

export default Login;
