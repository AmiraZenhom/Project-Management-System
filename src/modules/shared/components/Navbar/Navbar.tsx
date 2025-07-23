
import { useContext } from "react";
import navLogo from "../../../../assets/images/navLogo.png";
import userPhoto from "../../../../assets/images/navbarImg.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Contxet/AuthContext";

export default function Navbar() {
  let {loginData}:any=useContext(AuthContext)
  return (
    <>
      <div className="container-fluid bg-white ">
        <div className="row  justify-content-between">
          <div className="col-md-8  ">
            <Link to="/dashboard"><img className="  w-25  " src={navLogo} alt="PMSLogo" /></Link>
          </div>
          <div className="col-md-4   ">
            {" "}
            <div className="row pt-3 ">
              <div className="col-md-2 text-end">
                <img src={userPhoto} className="w-75" alt="userPhoto" />
              </div>
          
            <div className="col-md-10">
              {" "}
              <p className="pb-0 mb-0  ">{loginData?.userName}</p>
              <p className="pt-0 mt-0  ">{loginData?.userEmail}</p>
            </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
