import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import DeleteEmployeeButton from "../../components/Button/DeleteEmployeeButton";
import UpdateEmployeeButton from "../../components/Button/UpdateEmployeeButton";
import employeeService from "../../services/employeeService";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);

  // Get All User
  const getEmployeeList = async () => {
    try {
      const response = await employeeService.getAll();
      setEmployeeList(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  // Call API
  useEffect(() => {
    getEmployeeList();
    
  },[]);

  return (
    <>
      <Table className="table" dataSource={employeeList} rowKey={"id"}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Country" dataIndex="country" key="country" />
        {/* Action */}
        <Column
          title="Action"
          key="action"
          render={(record) => (
            <Space size="middle">
              <UpdateEmployeeButton
                employee={record}
                getEmployeeList={getEmployeeList}
              >
                Edit
              </UpdateEmployeeButton>
              <DeleteEmployeeButton
                employee={record}
                getEmployeeList={getEmployeeList}
              >
                Delete
              </DeleteEmployeeButton>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default EmployeeList;
