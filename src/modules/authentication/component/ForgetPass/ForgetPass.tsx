import React from "react";
import logo from "../../../../assets/images/PMS 3.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTHURLS } from "../../../../Constants/URLS";

export default function ForgetPass() {
  let Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(
        `${AUTHURLS.forgetPassUrl}`,
        data
      );
      toast.success("go to resrt");
      Navigate("/reset");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="Auth-container  ">
        <div className="container-fluid  ">
          <div className="row  vh-100  justify-content-center  align-items-center   ">
            <div className="col-md-6  rounded rounded-2 px-5   ">
              <div className=" text-center m-auto w-50 ">
                <img className=" w-100 text-center" src={logo} alt="PMS-Logo" />
              </div>

              {/* ************************* for caption ***************************** */}
              <div className="caption px-5 py-5">
                <form
                  className="form  m-auto mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="text-white mb-0  ">welcome to PMS</p>
                  <h3 className="textColor mt-0 mb-5">
                    <span className="border-bottom border-warning border-3  ">
                      <b> F</b>
                    </span>
                    orget Password
                  </h3>

                  {/* ************************* for input email ***************************** */}

                  <div className=" mt-4 position-relative form-group">
                    <label htmlFor="email" className="form-label textColor ">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className=" p-2 text-white inputs rounded-4"
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

                  {/* ************************* for button ***************************** */}
                  <div className="  text-center mt-4 ">
                    <button className="buttonLink">Verify</button>
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
