import { EditOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import employeeService from "../../services/employeeService";

const UpdateEmployeeButton = ({ employee, getEmployeeList }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const initialForm = {
    name: employee.name,
    phone: employee.phone,
    email: employee.email,
    country: employee.country,
  };
  const [formData, setFormData] = useState({ ...initialForm });
  //*******************Modal******************
  const showModal = () => {
    setOpen(true);
  };
  //
  const handleCancel = () => {
    setFormData(initialForm);
    setOpen(false);
  };

  //   ************************Form******************
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

  //   handle update
  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      const updateEmployee = formData;

      if (isEmptyEmployee(updateEmployee)) {
        api.info({
          message: "Error",
          description:
            "Error: Employee creation failed. Please ensure all required fields are filled correctly.",
          duration: 1,
          icon: (
            <MehOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
      } else {
        await employeeService.updateEmployee(employee.id, updateEmployee);
        api.info({
          message: "Success",
          description: `Employee Update: ${updateEmployee.name}`,
          duration: 1,
          icon: (
            <SmileOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
        setOpen(false);
        getEmployeeList();
      }
    } catch (error) {
      console.log("Error Update: ", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Button style={{ borderColor: "#FFD760" }} onClick={showModal}>
        <EditOutlined style={{ color: "#FFBF00" }} />
      </Button>
      <Modal
        title={`Edit ${initialForm.name}`}
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Update"
      >
        <Form form={form} layout="vertical">
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
        </Form>
      </Modal>
    </>
  );
};

export default UpdateEmployeeButton;
