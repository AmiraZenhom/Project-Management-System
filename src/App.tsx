import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./modules/shared/components/AuthLayout/AuthLayout";
import Login from "./modules/authentication/component/Login/Login";
import Register from "./modules/authentication/component/Registeration/Register";
import ForgetPass from "./modules/authentication/component/ForgetPass/ForgetPass";
import ChangePass from "./modules/authentication/component/ChangePass/ChangePass";
import ResetPass from "./modules/authentication/component/ResetPass/ResetPass";
import NotFound from "./modules/shared/components/NotFound/NotFound";
import MasterLayout from "./modules/shared/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/dashboard/components/Dashboard/Dashboard";
import Projects from "./modules/dashboard/components/Projects/Projects";
import Tasks from "./modules/dashboard/components/Tasks/Tasks";
import Users from "./modules/dashboard/components/Users/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/shared/components/ProtectedRoute/ProtectedRoute";
import AddProject from "./modules/dashboard/components/AddProject/AddProject";
import AddTask from "./modules/dashboard/components/AddTask/AddTask";
import Verify from "./modules/authentication/component/Verify/Verify";
import ProtectedRouteUser from "./modules/shared/components/ProtectedRouteUser/ProtectedRouteUser";
import { AuthContext } from "./Contxet/AuthContext";


function App() {
  let { loginData }: any = useContext(AuthContext);


  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login  /> },
        { path: "login", element: <Login  /> },
        { path: "register", element: <Register /> },
        { path: "forgetPass", element: <ForgetPass /> },
        { path: "changePass", element: <ChangePass /> },
        { path: "reset", element: <ResetPass /> },
        { path: "verify", element: <Verify /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout  />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard  /> },
        { path: "projects", element: <Projects /> },
        { path: "projects/addProject", element: <AddProject /> },
        { path: "tasks", element: <Tasks /> },
        { path: "tasks/addtask", element: <AddTask /> },
        { path: "users", element:<ProtectedRouteUser><Users /></ProtectedRouteUser>  },
        
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
