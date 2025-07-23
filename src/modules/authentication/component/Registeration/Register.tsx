import React from "react";
import logo from "../../../../assets/images/PMS 3.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTHURLS } from "../../../../Constants/URLS";

export default function Register() {
  let Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(`${AUTHURLS.registerUrl}`, data);
      toast.success("Register successfully");
      Navigate("/verify");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="Auth-container   ">
        <div className="container-fluid  ">
          <div className="row  vh-100  justify-content-center  align-items-center   ">
            <div className="col-md-10  rounded rounded-2 px-5   ">
              <div className=" text-center m-auto w-50 ">
                <img className=" w-50 text-center" src={logo} alt="PMS-Logo" />
              </div>

              {/* ************************* for caption ***************************** */}
              <div className="caption px-5 py-1">
                <p className="text-white mb-0  ">welcome to PMS</p>
                <h3 className="textColor mt-0 mb-2">
                  <span className="border-bottom border-warning border-3  ">
                    <b> C</b>
                  </span>
                  reate New Account
                </h3>
                <form
                  className="form  m-auto mt-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    {/* ************************* for input Image ***************************** */}
                    <div className="form-group  mt-1 col-md-12 justify-content-center align-items-center">
                      <div className="w-25 text-center   photo m-auto ">
                        <input
                          className="bg-warning text-white text-center inputs rounded rounded-circle"
                          aria-label="file example"
                          type="file"
                          {...register("profileImage", {})}
                        />
                      </div>
                    </div>
                    {/* ************************* for input Name ***************************** */}
                    <div className="form-group mt-3 position-relative mt-4 col-md-6">
                      <label htmlFor="">User Name</label>
                      <input
                        className=" p-2 mt-0 text-white inputs rounded-4"
                        placeholder="Enter your name"
                        type="text"
                        {...register("userName", {
                          required: true,
                        })}
                      />

                      {errors.userName &&
                        errors.userName.type === "required" && (
                          <span className="text-danger mt-4">
                            userName is required
                          </span>
                        )}
                    </div>
                    {/* ************************* for input email ***************************** */}
                    <div className="form-group mt-3 position-relative mt-4 col-md-6">
                      <label htmlFor="">E-mail</label>
                      <input
                        className=" p-2 mt-0 text-white inputs rounded-4"
                        placeholder="Enter your E-mail"
                        type="email"
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
                    {/* ************************* for input country ***************************** */}
                    <div className="form-group mt-3 position-relative mt-4 col-md-6">
                      <label htmlFor="">country</label>
                      <input
                        className=" p-2 text-white inputs"
                        placeholder="Enter your country"
                        type="text"
                        {...register("country", {
                          required: true,
                        })}
                      />

                      {errors.country && errors.country.type === "required" && (
                        <span className="text-danger mt-4">
                          country is required
                        </span>
                      )}
                    </div>
                    {/* ************************* for input Phone Number ***************************** */}
                    <div className="form-group mt-3 position-relative mt-4 col-md-6">
                      <label htmlFor="">Phone Number</label>
                      <input
                        className=" p-2 mt-0 text-white inputs rounded-4"
                        placeholder="Enter your phone number"
                        type="number"
                        {...register("phoneNumber", {
                          required: true,
                        })}
                      />

                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "required" && (
                          <span className="text-danger mt-4">
                            phoneNumber is required
                          </span>
                        )}
                    </div>

                    {/* ************************* for input password ************************* */}
                    <div className="form-group mt-3 position-relative col-md-6">
                      <label htmlFor="">Password</label>
                      <input
                        className=" p-2 mt-0 text-white inputs rounded-4"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", {
                          required: true,
                          pattern:
                            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                        })}
                      />

                      {errors.password &&
                        errors.password.type === "required" && (
                          <span className="text-danger mt-3">
                            Password is required
                          </span>
                        )}

                      {errors.password &&
                        errors.password.type === "pattern" && (
                          <span className="text-danger mt-4">
                            Password must include at least one lowercase letter,
                            one uppercase letter, one digit, one special
                            character, and be at least 6 characters long
                          </span>
                        )}
                    </div>
                    {/* ************************* for input confirmPassword ************************* */}
                    <div className="form-group mt-3 position-relative col-md-6">
                      <label htmlFor="">Password</label>
                      <input
                        className=" p-2 mt-0 text-white inputs rounded-4"
                        placeholder="Confirm New Password"
                        type="password"
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

                      {errors.confirmPassword &&
                        errors.confirmPassword.type === "pattern" && (
                          <span className="text-danger mt-4">
                            confirmPassword must include at least one lowercase
                            letter, one uppercase letter, one digit, one special
                            character, and be at least 6 characters long
                          </span>
                        )}
                    </div>
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
