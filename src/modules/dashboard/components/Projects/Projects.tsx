import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  BASEURL,
  requestHeader,
  PROJECTSURLS,
} from "../../../../Constants/URLS";
import { FaEye } from "react-icons/fa";
import { MdBlock, MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import NoData from "../../../shared/components/NoData/NoData";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import DeleteConformation from "../../../shared/components/DeleteConformation/DeleteConformation";
import Pagination from "react-bootstrap/Pagination";
import Paginations from "../../../shared/components/Pagination/Paginations";
import { AuthContext } from "../../../../Contxet/AuthContext";

interface project {
  id: number;
  title: string;
  description: string;
  task: object[];
  modificationDate: string;
}

export default function Projects() {
  let {loginData}:any=useContext(AuthContext)
  const [projectsList, setProjectsList] = useState<project[]>([]);
  const [projectDetails, setProjectDetails] = useState<project | null>(null);
  const [show, setShow] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modelState, setModelState] = useState("close");
  const handleClose = () => setModelState("close");
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id: number) => {
    setProjectId(id);
    setShowDelete(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  let AddNewProjects = () => {
    navigate("/dashboard/projects/addProject");
  };
  // *************** to show update model ***************
  const showUpdateModel = (project: any) => {
    setProjectId(project?.id);
    setValue("title", project?.title);
    setValue("description", project?.description);
    setModelState("update-model");
  };

  // *************** to view detail of Project *****************
  const showViewModel = (id: number) => {
    setProjectId(id);
    getProjectDetails(id), setShow(true);
  };

  /*********************list************************ */
  // let getProjectsList = async (pageNo: any, pageSize: any) => {
  //   try {
  //     let response = await axios.get(PROJECTSURLS.getAll, {
  //       params: { pageSize: pageSize, pageNumber: pageNo },
  //       headers: requestHeader(),
  //     });
  //     setProjectsList(response.data.data);
  //     setTotalPages(response?.data?.totalNumberOfPages || 1);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getProjectsList = async (pageNo: any, pageSize: any) => {
  try {
    const url =
      loginData?.userGroup === "Employee"
        ? PROJECTSURLS.getAllEmployee
        : PROJECTSURLS.getAll;

    const response = await axios.get(url, {
      params: { pageSize: pageSize, pageNumber: pageNo },
      headers: requestHeader(),
    });

    setProjectsList(response.data.data);
    setTotalPages(response?.data?.totalNumberOfPages || 1);
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

  /*****************************View*************************/
  let getProjectDetails = async (id: number) => {
    try {
      let response = await axios.get(`${PROJECTSURLS.toggleUrl(id)}`, {
        headers: requestHeader(),
      });
      setProjectDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*******************deleteProject***********************/
  let deleteProject = async (id: number) => {
    try {
      let response = await axios.delete(`${PROJECTSURLS.toggleUrl(id)}`, {
        headers: requestHeader(),
      });
      console.log(response);

      getProjectsList(1, 10);
    } catch (error) {}
    handleCloseDelete();
  };
  /*******************up data Project***********************/
  let updateProject = async (data: any) => {
    try {
      let response = await axios.put(
        `${PROJECTSURLS.toggleUrl(projectId)}`,
        data,
        {
          headers: requestHeader(),
        }
      );
      console.log(response);
      handleClose();
      getProjectsList(1, 10);
    } catch (error) {}
    handleCloseDelete();
  };

  // /********************pagination********************** */

  // const getPageNumbers = () => {
  //   const maxPagesToShow = 5;
  //   const pages = [];

  //   let startPage = Math.max(1, pageNumber - Math.floor(maxPagesToShow / 2));
  //   let endPage = startPage + maxPagesToShow - 1;

  //   if (endPage > totalPages) {
  //     endPage = totalPages;
  //     startPage = Math.max(1, endPage - maxPagesToShow + 1);
  //   }

  //   for (let i = startPage; i <= endPage; i++) {
  //     pages.push(i);
  //   }

  //   return pages;
  // };
  useEffect(() => {
    getProjectsList(pageNumber, 10);
  }, [pageNumber]);

  return (
    <>
      <div className=" bg-white py-2 my-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="  ">projects</h2>
            </div>
             {loginData?.userGroup!=="Employee"?(<div className="col-md-6 text-end ">
              <button
                className="btn btn-warning text-center text-white rounded rounded-5 "
                onClick={AddNewProjects}
              >
                {" "}
                + Add New Project{" "}
              </button>
            </div>):("")}
            
          </div>
        </div>
      </div>
      <div className="container-fluid  my-4 ">
        {projectsList.length > 0 ? (
          <table className="table  table-hover ">
            <thead className="  bgThTable ">
              <tr>
                <th className="text-white" scope="col">
                  Title
                </th>

                <th scope="col">Description</th>
                <th scope="col">No of Task</th>

                <th scope="col">ModificationDate</th>
                {loginData?.userGroup!=="Employee"?( <th scope="col">Action</th>):("")}
               
              </tr>
            </thead>
            <tbody className="bgTable">
              {projectsList.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>

                  <td>{project.description}</td>
                  <td>{project?.task.length}</td>
                  <td>{project.modificationDate.slice(0, 10)}</td>
                  {loginData?.userGroup!=="Employee"?( <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=" white"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => showViewModel(project.id)}
                        >
                          <i className="  text-success px-2">
                            {" "}
                            <FaEye /> View
                          </i>{" "}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => showUpdateModel(project)}>
                          <i className=" text-warning px-2">
                            {" "}
                            <BiEdit /> Up data
                          </i>
                        </Dropdown.Item>{" "}
                        <Dropdown.Item
                          onClick={() => handleShowDelete(project.id)}
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
      {/*************** pagination ********************/}
      <Paginations
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      />

      {/*************** view modal ********************/}

      {show && projectDetails && (
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
              <div className="col-md-8 my-2">{projectDetails?.title} </div>
              <div className="col-md-4 my-2">Description :</div>
              <div className="col-md-8 my-2">
                {projectDetails?.description}{" "}
              </div>
              <div className="col-md-4 my-2">No of Task :</div>
              <div className="col-md-8 my-2">
                {projectDetails?.task.length}{" "}
              </div>

              <div className="col-md-4 my-2">Date :</div>
              <div className="col-md-8 my-2">
                {projectDetails?.modificationDate?.slice(0, 10)}{" "}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/*************** Delete modal ********************/}
      <DeleteConformation
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        deleteFun={() => deleteProject(projectId)}
      />

      {/* ************* this model to update Category *********** */}
      <Modal show={modelState == "update-model"} onHide={handleClose}>
        <Modal.Body>
          <div className="headerModel">
            <h3 className="ms-3 mt-3 text-center fw-bold text-warning">
              Update project
            </h3>
          </div>

          <form
            className="form w-100 m-auto mt-5"
            onSubmit={handleSubmit(updateProject)}
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

            <div className="form-group mt-3 text-center">
              <button className="btn btn-warning  mt-4 fs-4">"Update"</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
