import axios from "axios";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { PROJECTSURLS, requestHeader } from "../../../../Constants/URLS";
import { toast } from "react-toastify";

export default function AddProject() {
  let Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(`${PROJECTSURLS.getAdd}`, data, {
        headers: requestHeader(),
      });

      toast.success("Add Projects successfully");

      Navigate("/dashboard/projects");
      console.log(response);
      
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="  py-2 my-2">
        <div className="container-fluid">
          <div className="row  justify-content-center ">
            <div className="col-md-12 bg-white">
              <Link
                to="/dashboard/projects"
                className="text-decoration-none text-dark py-2 "
              >
                {" "}
                <BiArrowBack />
                View All Projects
              </Link>
              <h2 className="my-3  "> Add a New Project</h2>
            </div>
            <div className="row justify-content-center  ">
              <form
                className="form   mt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-md-8 my-4  p-2 px-5 rounded rounded-3 m-auto bg-white ">
                  <div className="my-5">
                    <label htmlFor="Title">Title</label>
                    <div className="input-group input-group-lg mt-2">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Name"
                        {...register("title", {
                          required: true,
                        })}
                      />
                      {errors.title && errors.title.type === "required" && (
                        <p className="text-danger mt-4 mx-3">
                          Title is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label htmlFor="Title">Description</label>
                    <div className="input-group input-group-lg mt-2">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Description"
                        {...register("description", {
                          required: true,
                        })}
                      />
                      {errors.title && errors.title.type === "required" && (
                        <p className="text-danger mt-4 mx-3">
                          Description is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12 text-end mb-4 ">
                    <button className="btn btn-warning px-4  text-white  rounded rounded-5 ">
                      {" "}
                      save{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
