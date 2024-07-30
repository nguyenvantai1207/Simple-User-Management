import { Button, Form, Input, Space, notification } from "antd";
import { useState } from "react";
import { MehOutlined, SmileOutlined } from "@ant-design/icons";
import employeeService from "../../services/employeeService";

const CreateEmployeeForm = () => {
  // Create variable & state
  const initialForm = {
    name: "",
    phone: "",
    email: "",
    country: "",
  };
  const [formData, setFormData] = useState({ ...initialForm });
  const [api, contextHolder] = notification.useNotification();
  // Handle Change
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  

  // Handle Check
  const isEmptyEmployee = (obj) => {
    return Object.keys(obj).every((key) => {
      const value = obj[key];
      return value === null || value === undefined || value === "";
    });
  };

  // Handle reset
  const handleReset = () => {
    setFormData(initialForm);
  };

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const newEmployee = formData;

      // Execute create employee
      if (isEmptyEmployee(newEmployee)) {
        console.log("Error Part!");
        api.info({
          message: "Error",
          description:
            "Error: Employee creation failed. Please ensure all required fields are filled correctly.",
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
        console.log("Success Part!");
        await employeeService.createEmployee(newEmployee);
        api.info({
          message: "Success",
          description: `Employee Created: ${newEmployee.name}`,
          duration: 2.5,
          icon: (
            <SmileOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
      }

      // Reset Form
      handleReset();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      {contextHolder}
      <Form
        layout="vertical"
        style={{
          width: "400px",
          minHeight: "670px",
          margin: "50px auto",
        }}
      >
        <Form.Item label="Name">
          <Input
            name="name"
            placeholder="input Name"
            value={formData.name}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            name="phone"
            placeholder="input Phone Number"
            value={formData.phone}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            placeholder="input Email"
            value={formData.email}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item label="Country">
          <Input
            name="country"
            placeholder="input Country"
            value={formData.country}
            onChange={handleChangeInput}
          />
        </Form.Item>
        {/* Button */}
        <Form.Item>
          <Space size={"small"}>
            <Button type="primary" onClick={handleSubmit}>
              Add
            </Button>

            <Button
              style={{ background: "#DC3545", color: "white" }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEmployeeForm;
