import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
 
  PROJECTSURLS,
  requestHeader,
  TASKSURLS,
  USERSSURLS,
} from "../../../../Constants/URLS";
import { FaEye } from "react-icons/fa";
import {  MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import NoData from "../../../shared/components/NoData/NoData";

import {  useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";


import { useForm } from "react-hook-form";
import DeleteConformation from "../../../shared/components/DeleteConformation/DeleteConformation";

import { AuthContext } from "../../../../Contxet/AuthContext";
import TaskUser from "../TaskUser/TaskUser";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: {
    id: number;
    title: string;
    description: string;
  };
  employee: {
    id: number;
    userName: string;
    email: string;
  };
}
interface project {
  id: number;
  title: string;
  description: string;
  task: object[];
  modificationDate: string;
}
interface user {
  id: number;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
}

export default function Tasks() {
  let {loginData}:any=useContext(AuthContext)
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modelState, setModelState] = useState("close");
  const [usersList, setUsersList] = useState<user[]>([]);
  const [projectList, setProjectsList] = useState<project[]>([]);
  const handleClose = () => setModelState("close");
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id: number) => {
    setTaskId(id);
    setShowDelete(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  let AddNewTask = () => {
    navigate("/dashboard/tasks/addtask");
  };

  /*********************list user************************ */
  let getUserList = async (pageNo: number, pageSize: number) => {
    try {
      let response = await axios.get(USERSSURLS.UserssUrl, {
        params: { pageSize: pageSize, pageNumber: pageNo },
        headers: requestHeader(),
      });
      setUsersList(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*********************list************************ */
  let getProjectsList = async (pageNo: number, pageSize: number) => {
    try {
      let response = await axios.get(PROJECTSURLS.getAll, {
        params: { pageSize: pageSize, pageNumber: pageNo },
        headers: requestHeader(),
      });
      setProjectsList(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // *************** to show update model ***************
  const showUpdateModel = (task: any) => {
    setTaskId(task?.id);
    setValue("title", task?.title);
    setValue("description", task?.description);
    setValue("employeeId", task?.employee?.userName);
    setValue("projectId", task?.project?.title);
    setModelState("update-model");
  };

  // *************** to view detail of Project *****************
  const showViewModel = (id: number) => {
    setTaskId(id);
    getTaskDetails(id), setShow(true);
  };

  /*********************list************************ */
  let getTaskList = async (pageNo: number, pageSize: number) => {
    try {
      let response = await axios.get(TASKSURLS.getAll, {
        params: { pageSize: pageSize, pageNumber: pageNo },
        headers: requestHeader(),
      });
      setTasksList(response.data.data);
      console.log(response.data.data);

      setTotalPages(response?.data?.totalNumberOfPages || 1);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*****************************View*************************/
  let getTaskDetails = async (id: number) => {
    try {
      let response = await axios.get(`${TASKSURLS.toggleUrl(id)}`, {
        headers: requestHeader(),
      });
      setTaskDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*******************deleteProject***********************/
  let deleteTask = async (id: number) => {
    try {
      let response = await axios.delete(`${TASKSURLS.toggleUrl(id)}`, {
        headers: requestHeader(),
      });
      console.log(response);

      getTaskList(pageNumber, 10);
    } catch (error) {}
    handleCloseDelete();
  };
  /*******************up data Task***********************/
  let updateTask = async (data: any) => {
    try {
      let response = await axios.put(`${TASKSURLS.toggleUrl(taskId)}`, data, {
        headers: requestHeader(),
      });
      console.log(response);
      handleClose();
      getTaskList(pageNumber, 10);
    } catch (error) {}
    handleCloseDelete();
  };

  useEffect(() => {
    if (loginData?.userGroup !== "Employee") {
     getTaskList(pageNumber, 10);
    getUserList(pageNumber, 10);
    getProjectsList(pageNumber, 10);
  }  
   
  }, [pageNumber,loginData]);

  return (
    <>
      <div className=" bg-white py-2 my-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="  ">Tasks</h2>
            </div>
            {loginData?.userGroup!=="Employee"?(<div className="col-md-6 text-end ">
              <button
                className="btn btn-warning text-center text-white rounded rounded-5 "
                onClick={AddNewTask}
              >
                {" "}
                + Add New Task{" "}
              </button>
            </div>):("")}
            
          </div>
        </div>
      </div>



{loginData?.userGroup!=="Employee"?(  <div className="container-fluid  my-4 ">
        {tasksList.length > 0 ? (
          <table className="table  table-hover ">
            <thead className="  bgThTable ">
              <tr>
                <th className="text-white" scope="col">
                  Title
                </th>

                <th scope="col">Statues</th>
                <th scope="col">User</th>
                <th scope="col">Project</th>
                <th scope="col">ModificationDate</th>
                {loginData?.userGroup!=="Employee"?( <th scope="col">Action</th>):("")}
               
              </tr>
            </thead>
            <tbody className="bgTable">
              {tasksList.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>

                  <td>{task.status}</td>
                  <td>{task.employee?.userName}</td>
                  <td>{task.project?.title}</td>

                  <td>{task.modificationDate.slice(0, 10)}</td>
                  {loginData?.userGroup!=="Employee"?( <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=" white"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => showViewModel(task.id)}>
                          <i className="  text-success px-2">
                            {" "}
                            <FaEye /> View
                          </i>{" "}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => showUpdateModel(task)}>
                          <i className=" text-warning px-2">
                            {" "}
                            <BiEdit /> Up data
                          </i>
                        </Dropdown.Item>{" "}
                        <Dropdown.Item
                          onClick={() => handleShowDelete(task.id)}
                        >
                          {" "}
                          <i className="  text-danger px-2">
                            {" "}
                            <MdDelete /> Delete
                          </i>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </td>):("")}
                 
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
     

      
):(<TaskUser/>)}
    


      {/*************** view modal ********************/}

      {show && taskDetails && (
        <Modal
          className="MStyle"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="row  fs-5 ">
              <div className="col-md-4 my-2">Title :</div>
              <div className="col-md-8 my-2">{taskDetails?.title} </div>
              <div className="col-md-4 my-2">Statues :</div>
              <div className="col-md-8 my-2">{taskDetails?.status} </div>
              <div className="col-md-4 my-2">Project :</div>
              <div className="col-md-8 my-2">
                {taskDetails?.project?.title}{" "}
              </div>

              <div className="col-md-4 my-2">Date :</div>
              <div className="col-md-8 my-2">
                {taskDetails?.modificationDate?.slice(0, 10)}{" "}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/*************** Delete modal ********************/}
      <DeleteConformation
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        deleteFun={() => deleteTask(taskId)}
      />
      {/* ************* this model to update Task *********** */}
      <Modal show={modelState == "update-model"} onHide={handleClose}>
        <Modal.Body>
          <div className="headerModel">
            <h3 className="ms-3 mt-3 text-center fw-bold text-warning">
              Update project
            </h3>
          </div>

          <form
            className="form w-100 m-auto mt-5"
            onSubmit={handleSubmit(updateTask)}
          >
            {/* ************** for title input ************ */}
            <div className="form-group mt-4">
              <label>Title</label>
              <input
                className="form-control rounded-3 py-2 mt-2"
                placeholder="Name"
                type="text"
                {...register("title", {
                  required: true,
                })}
              />

              {errors.title && errors.title.type === "required" && (
                <span className="text-danger mt-4">title is required</span>
              )}
            </div>

            {/* ************** for description input ************ */}
            <div className="form-group mt-4 ">
              <label>Description</label>
              <input
                className="form-control rounded-3 pb-5 mt-2"
                placeholder="Description"
                type="text"
                {...register("description", {
                  required: true,
                })}
              />

              {errors.description && errors.description.type === "required" && (
                <span className="text-danger mt-4">
                  description is required
                </span>
              )}
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
            </div>
            <div className="form-group mt-3 text-center">
              <button className="btn btn-warning  mt-4 fs-4">"Update"</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
