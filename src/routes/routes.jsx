import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home";
import EmployeeList from "../pages/EmployeeList/EmployeeList";
import CreateEmployeeForm from "../components/Form/CreateEmployeeForm";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   index: true,
      //   element: <h1>Hello World</h1>,
      // },
      {
        path: "employee",
        element: <EmployeeList />,
      },
      {
        path: "insert",
        element: <CreateEmployeeForm />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
