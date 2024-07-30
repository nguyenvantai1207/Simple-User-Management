import api from "./axiosClient";

const END_POINT = "/users/";

const userService = {
  getAll() {
    return api.get(END_POINT);
  },
  createUser(newUser) {
    return api.post(`${END_POINT}`, newUser);
  },
};

export default userService;
