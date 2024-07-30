import { Button, Flex, Form, Input, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import { LockFilled, SmileOutlined } from "@ant-design/icons";
import "./Register.css";

const Register = () => {
  const userObject = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(userObject);

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  //   handle change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      const response = await userService.createUser(formData);
      console.log(response);
      if (response.status === 201) {
        api.info({
          message: "Success",
          description: "You're registered! Redirecting to homepage.",
          duration: 2,
          icon: (
            <SmileOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });

        setFormData(userObject);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      {contextHolder}
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
        {/* {contextHolder} */}
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
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  height: 700,
                  padding: "200px 20px",
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                {/* Title */}
                <Form.Item
                  wrapperCol={{
                    offset: 1,
                    // span: ,
                  }}
                >
                  <p
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    Create new account
                  </p>
                </Form.Item>

                {/* Username */}
                <Form.Item
                  wrapperCol={{
                    offset: 0,
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

                {/* Password */}
                <Form.Item
                  wrapperCol={{
                    offset: 0,
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

                {/* Button */}
                <Form.Item
                  wrapperCol={{
                    offset: 0,
                    span: 32,
                  }}
                >
                  <div className="button-container">
                    <Button
                      type="primary"
                      className="register-button"
                      htmlType="submit"
                      onClick={handleSubmit}
                      size="large"
                    >
                      <Flex gap="" justify="space-between" align="flex-start">
                        <span className="signup__icon">
                          <LockFilled />
                        </span>
                        <span className="signup__text">Sign up</span>
                      </Flex>
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Content>
          </Flex>
        </Layout>
      </div>
    </div>
  );
};

export default Register;
