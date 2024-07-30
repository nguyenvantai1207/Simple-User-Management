import api from "./axiosClient";

const END_POINT = "/employees/";

const employeeService = {
  getAll() {
    return api.get(END_POINT);
  },
  getDetail(employeeId) {
    return api.get(`${END_POINT}${employeeId}`);
  },
  createEmployee(newEmployee) {
    return api.post(`${END_POINT}`, newEmployee);
  },
  updateEmployee(employeeId, newEmployee) {
    return api.put(`${END_POINT}${employeeId}`, newEmployee);
  },
  deleteEmployee(employeeId) {
    return api.delete(`${END_POINT}${employeeId}`);
  },
};

export default employeeService;
