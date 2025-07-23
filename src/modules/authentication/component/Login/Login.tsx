import  { useContext } from "react";
import logo from "../../../../assets/images/PMS 3.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTHURLS } from "../../../../Constants/URLS";
import { AuthContext } from "../../../../Contxet/AuthContext";

// Emploee: lilig58138@mvpmedix.com
// password:@Password123!
 
// Manager:amirazenhom88@gmail.com
// password:@Password123!



export default function Login() {
  let {saveLoginData}:any=useContext(AuthContext)
  let Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(`${AUTHURLS.loginUrl}`, data,);
      localStorage.setItem("token", response.data.token);

      toast.success("Login successfully");
      saveLoginData();
      Navigate("/dashboard");
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
                <img className=" w-100 text-center" src={logo} alt="PMS-Logo" />
              </div>

              {/* ************************* for caption ***************************** */}
              <div className="caption px-5 py-2">
                <form
                  className="form  m-auto mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="text-white mb-0  ">welcome to PMS</p>
                  <h3 className="textColor mt-0 mb-5">
                    <span className="border-bottom border-warning border-3  ">
                      <b> L</b>
                    </span>
                    ogin
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

                  {/* ************************* for input password ***************************** */}

                  <div className="mt-4 position-relative form-group">
                    <label htmlFor="pass" className="form-label textColor">
                      Password
                    </label>
                    <input
                      type="password"
                      className=" p-2 text-white inputs rounded-4"
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
                  {/* ************************* for links and button ***************************** */}

                  <div className="d-flex justify-content-between ">
                    <div className="rigester mt-3 text-end">
                      <Link
                        to="/register"
                        className="text-white text-decoration-none"
                      >
                        Register Now ?
                      </Link>
                    </div>

                    <div className="rigester mt-3 text-end">
                      <Link
                        to="/forgetPass"
                        className="text-white text-decoration-none"
                      >
                        Forget Password
                      </Link>
                    </div>
                  </div>
                  <div className="  text-center mt-4 mb-4 ">
                    <button className="buttonLink">Login</button>
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
