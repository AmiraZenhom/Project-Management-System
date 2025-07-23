
import logo from "../../../../assets/images/PMS 3.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  FaArrowCircleLeft} from "react-icons/fa";
import { AUTHURLS, requestHeader } from "../../../../Constants/URLS";
export default function ChangePass() {
  let Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.put(
        `${AUTHURLS.changePassUrl}`,
        data, {
                  headers: requestHeader(),
                }
      );
     
      toast.success("ChangePassword successfully");
      Navigate("/login");
       console.log(response)
    } catch (error: any) {
      toast.error(error.response.data.message);
      
    }
  };
  return (
    <>
      <div className="Auth-container   ">
        <div className="container-fluid  ">
          <Link to="/dashboard" className=" text-decoration-none textColor fs-4 "> {<FaArrowCircleLeft />} Back </Link>
          <div className="row  vh-100  justify-content-center  align-items-center   ">
            <div className="col-md-6  rounded rounded-2 px-5   ">
              <div className=" text-center m-auto w-50 ">
                <img className=" w-75 text-center" src={logo} alt="PMS-Logo" />
              </div>
<div className="backhome"></div>
              {/* ************************* for caption ***************************** */}
              <div className="caption px-5 py-1">
                <form
                  className="form  m-auto mt-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="text-white mb-0  ">welcome to PMS</p>
                  <h3 className="textColor mt-0 mb-4">
                    <span className="border-bottom border-warning border-3  ">
                      <b> C</b>
                    </span>
                    hange Password
                  </h3>

                  {/* ************************* for input Old Password ***************************** */}

                  <div className="mt-3 position-relative form-group">
                    <label htmlFor="pass" className="form-label textColor mb-0">
                      Old Password
                    </label>
                    <input
                      type="password"
                      className=" p-2 mt-0 text-white inputs rounded-4"
                      placeholder="Enter your Old Password"
                      {...register("oldPassword", {
                        required: true,
                        pattern:
                          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                      })}
                    />
                    {errors.oldPassword &&
                      errors.oldPassword.type === "required" && (
                        <span className="text-danger mt-4">
                          oldPassword is required
                        </span>
                      )}
                  </div>
                  {/* ************************* for input New Password ***************************** */}

                  <div className="mt-3 position-relative form-group">
                    <label htmlFor="pass" className="form-label textColor mb-0">
                      New Password
                    </label>
                    <input
                      type="password"
                      className=" p-2 mt-0 text-white inputs rounded-4"
                      placeholder="Enter your password"
                      {...register("newPassword", {
                        required: true,
                        pattern:
                          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                      })}
                    />
                    {errors.newPassword &&
                      errors.newPassword.type === "required" && (
                        <span className="text-danger mt-4">
                          newPassword is required
                        </span>
                      )}
                  </div>
                  {/* ************************* for input  confirm New Password ***************************** */}

                  <div className="mt-3 position-relative form-group">
                    <label htmlFor="pass" className="form-label textColor mb-0">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className=" p-2 mt-0 text-white inputs rounded-4"
                      placeholder="Enter Confirm New Password"
                      {...register("confirmNewPassword", {
                        required: true,
                        pattern:
                          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                      })}
                    />
                    {errors.confirmNewPassword &&
                      errors.confirmNewPassword.type === "required" && (
                        <span className="text-danger mt-4">
                          confirm New Password is required
                        </span>
                      )}
                  </div>

                  {/* ************************* for button ***************************** */}

                  <div className="  text-center m-4  ">
                    <button className="buttonLink">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
