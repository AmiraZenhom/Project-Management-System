import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../../../assets/images/PMS 3.png";
import {
  FaBars,
  FaUser,
  FaArrowAltCircleRight,
  FaTasks,
  FaExchangeAlt,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaDiagramProject } from "react-icons/fa6";
import { AuthContext } from "../../../../Contxet/AuthContext";

export default function sidebar() {
  let {loginData}:any =useContext(AuthContext)
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div
        style={{ direction: "ltr" }}
        className="d-flex vh-100 sidebar-container "
      >
        <Sidebar
          collapsed={collapsed}
          backgroundColor="#0E382F"
          className="textColor  "
        >
          <Menu>
            <MenuItem
              icon={<FaBars />}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "" : " "}
              <img src={logo} className="sidelogo" alt="sidebarLogo" />
            </MenuItem>
             <MenuItem
              icon={<FaHome />}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home
            </MenuItem>
            {loginData?.userGroup!=="Employee"?(<MenuItem
              icon={<FaUser />}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users
            </MenuItem>):("")}
            
            <MenuItem
              icon={<FaDiagramProject />}
              component={<Link to="/dashboard/projects" />}
            >
              {" "}
              Projects
            </MenuItem>
            <MenuItem
              icon={<FaTasks />}
              component={<Link to="/dashboard/tasks" />}
            >
              {" "}
              Tasks{" "}
            </MenuItem>
            <MenuItem
              icon={<FaExchangeAlt />}
              component={<Link to="/changePass" />}
            >
              ChangePassword
            </MenuItem>
            <MenuItem icon={<FaArrowAltCircleRight />} onClick={LogOut}>
              {" "}
              Logout{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
