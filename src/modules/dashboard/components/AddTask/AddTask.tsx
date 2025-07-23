import axios from "axios";
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {
  PROJECTSURLS,
  requestHeader,
  TASKSURLS,
  USERSSURLS,
} from "../../../../Constants/URLS";
import { toast } from "react-toastify";

type project = {
  id: number;
  title: string;
  description: string;
  task:object[];
  modificationDate: string;
};
type user = {
  id: number;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
};


export default function AddTask() {
  let Navigate = useNavigate();
  const [usersList, setUsersList] = useState<user[]>([]);
  const [projectList, setProjectsList] = useState<project[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(`${TASKSURLS.getAdd}`, data, {
        headers: requestHeader(),
      });

      toast.success("Add Tasks successfully");

      Navigate("/dashboard/tasks");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

    /*********************list user************************ */
  let getUserList = async () => {
    try {
      let response = await axios.get(
        `${USERSSURLS.UserssUrl}/?pageSize=10`,
        {
          headers: requestHeader(),
        }
      );
      setUsersList(response?.data?.data);
      console.log(response?.data?.data);

      
    } catch (error) {
      console.log(error);
    }
  };

   /*********************list************************ */
  let getProjectsList = async (page: number = 1) => {
    try {
      let response = await axios.get(
        `${PROJECTSURLS.getAll}?pageSize=10&pageNumber=${page}`,
        {
          headers: requestHeader(),
        }
      );
      setProjectsList(response.data.data);
    
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
    getUserList();
    getProjectsList();
}, [])

  return (
    <>
      <div className="  py-2 my-2">
        <div className="container-fluid">
          <div className="row  justify-content-center ">
            <div className="col-md-12 bg-white">
              <Link
                to="/dashboard/tasks"
                className="text-decoration-none text-dark py-2 "
              >
                {" "}
                <BiArrowBack />
                View All Projects
              </Link>
              <h2 className="my-3  "> Add a New Task</h2>
            </div>
            <div className="row justify-content-center  ">
              <form className="form " onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-8 my-4  p-2 px-5 rounded rounded-3 m-auto bg-white ">
                  <div className="row">
                    <div className="col-md-12">
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
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
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
                     <div className="row">
                         <div className="col-md-6">
                       {/* ************** to select user **************** */}
           
              <div className="form-group ">
                <label className="pb-2">user</label>
                <select
                  {...register("employeeId", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="form-select"
                >
                  <option value="" className="text-muted">
                    Select user
                  </option>
                  {usersList.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user?.userName}
                    </option>
                  ))}
                </select>
             
            </div>
            
            
                      </div>
                      <div className="col-md-6">
                          {/* ************** to select project **************** */}
             <div className="col-md-6"></div>
              <div className="form-group">
                <label className="pb-2">project</label>
                <select
                  {...register("projectId", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="form-select"
                >
                  <option value="" className="text-muted">
                    Select project
                  </option>

                  {projectList.map((project, index) => (
                    <option key={index} value={project.id}>
                      {project?.title}
                    </option>
                  ))}
                </select>
              
            </div>
                      </div>
                     </div>
                    </div>
                    <div className="col-md-12 text-end my-4 ">
                      <button className="btn btn-warning px-4  text-white  rounded rounded-5 ">
                        {" "}
                        save{" "}
                      </button>
                    </div>
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
