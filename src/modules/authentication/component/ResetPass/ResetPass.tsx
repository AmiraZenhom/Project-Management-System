
import logo from "../../../../assets/images/PMS 3.png";
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTHURLS } from "../../../../Constants/URLS";

export default function ResetPass() {
  let Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(
        `${AUTHURLS.resetUrl}`,
        data
      );
      toast.success("ChangePassword successfully");
      Navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="Auth-container   ">
        <div className="container-fluid  ">
          <div className="row  vh-100  justify-content-center  align-items-center   ">
            <div className="col-md-6  rounded rounded-2 px-5   ">
              <div className=" text-center m-auto w-50 ">
                <img className=" w-75 text-center" src={logo} alt="PMS-Logo" />
              </div>

              {/* ************************* for caption ***************************** */}
              <div className="caption px-5 py-1">
                <form
                  className="form  m-auto mt-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="text-white mb-0  ">welcome to PMS</p>
                  <h3 className="textColor mt-0 mb-4">
                    <span className="border-bottom border-warning border-3  ">
                      <b> R</b>
                    </span>
                    eset Password
                  </h3>

                  {/* ************************* for input email ***************************** */}

                  <div className=" mt-3 position-relative form-group">
                    <label htmlFor="email" className="form-label textColor mb-0 ">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className=" p-2 mt-0 text-white inputs rounded-4"
                      placeholder="Enter your E-mail"
                      {...register("email", {
                        required: true,
                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="text-danger mt-4">
                        Email is required
                      </span>
                    )}

                    {errors.email && errors.email.type === "pattern" && (
                      <span className="text-danger mt-4">invaild email</span>
                    )}
                  </div>

                  {/* ************************* for OTP Verification ***************************** */}

                  <div className="mt-3 position-relative form-group">
                    <label htmlFor="text" className="form-label textColor mb-0">
                      OTP Verification
                    </label>
                    <input
                      type="text"
                      className=" p-2 mt-0 text-white inputs rounded-4"
                      placeholder="Enter Verification"
                      {...register("seed", {
                        required: true,
                      })}
                    />
                    {errors.seed && errors.seed.type === "required" && (
                      <span className="text-danger mt-4">OTP is required</span>
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
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                      })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-danger mt-4">
                        Password is required
                      </span>
                    )}
                  </div>
                  {/* ************************* for input  Confirm Password ***************************** */}

                  <div className="mt-3 position-relative form-group">
                    <label htmlFor="pass" className="form-label textColor mb-0">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className=" p-2 mt-0 text-white inputs rounded-4"
                      placeholder="Enter Confirm New Password"
                      {...register("confirmPassword", {
                        required: true,
                        pattern:
                          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                      })}
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "required" && (
                        <span className="text-danger mt-4">
                          confirmPassword is required
                        </span>
                      )}
                  </div>

                  {/* ************************* for button ***************************** */}

                  <div className="  text-center mt-3 mb-2 ">
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
