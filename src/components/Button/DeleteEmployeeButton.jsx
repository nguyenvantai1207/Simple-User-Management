import React from "react";
import { DeleteOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Popconfirm, notification } from "antd";
import employeeService from "../../services/employeeService";

const DeleteEmployeeButton = ({ employee, getEmployeeList }) => {
  const [api, contextHolder] = notification.useNotification();
  const confirm = async (e) => {
    console.log(e);
    try {
      await employeeService.deleteEmployee(employee.id);

      api.info({
        message: "Success",
        description: `Employee Update: ${employee.name}`,
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
        getEmployeeList();
      }, 1000);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  const cancel = (e) => {
    console.log(e);
  };

  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Delete Employee"
        description="Are you sure to delete this employee?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>
          <DeleteOutlined style={{ color: "red" }} />
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeleteEmployeeButton;
