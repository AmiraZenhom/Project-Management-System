import axios from "axios";
import  { useEffect, useState } from "react";
import {  requestHeader, USERSSURLS } from "../../../../Constants/URLS";
import { FaEye } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import NoData from "../../../shared/components/NoData/NoData";
import { toast } from "react-toastify";

import Paginations from "../../../shared/components/Pagination/Paginations";
interface user {
  id: number;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
}

export default function Users() {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userDetails, setUserDetails] = useState<user | null>(null);
  const [usersList, setUsersList] = useState<user[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  // *************** to view detail of user *****************
  const showViewModel = (id: number) => {
    setUserId(id);
    getUserDetails(id);
    setShow(true);
  };

  /*********************  View  ************************ */
  let getUserDetails = async (id: number) => {
    try {
      let response = await axios.get(`${USERSSURLS.toggleStatusUrl(id)}`, {
        headers: requestHeader(),
      });
      setUserDetails(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  /*********************  Toggle  ************************ */
  let putToggleActive = async (id: number) => {
    try {
      let response = await axios.put(
        `${USERSSURLS.toggleStatusUrl(id)}`,
        { id },
        {
          headers: requestHeader(),
        }
      );
      getUserList(pageNumber, 10);

      const isActive = response?.data?.isActivated;
      if (isActive) {
        toast.success("User is Active ");
      } else {
        toast.error(" User is not Active ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*********************list************************ */
  let getUserList = async (pageNo: number, pageSize: number) => {
    try {
      let response = await axios.get(`${USERSSURLS.UserssUrl}`, {
        params: { pageSize: pageSize, pageNumber: pageNo },
        headers: requestHeader(),
      });
      setUsersList(response?.data?.data);
      setTotalPages(response?.data?.totalNumberOfPages || 1);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserList(pageNumber, 10);
  }, [pageNumber]);

  return (
    <>
      <div className=" bg-white py-2 my-2">
        <h2 className=" px-5  ">Users</h2>
      </div>
      <div className="container-fluid  my-4 ">
        {usersList.length > 0 ? (
          <table className="table  table-hover ">
            <thead className="  bgThTable ">
              <tr>
                <th className="text-white" scope="col">
                  User Name
                </th>
                <th scope="col">Statues</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Date Created</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="bgTable">
              {usersList?.map((user) => (
                <tr key={user.id}>
                  <td>{user?.userName}</td>
                  <td>
                    {" "}
                    {user?.isActivated ? (
                      <div className="bg-success text-center text-white w-100  rounded-5">
                        <span> Active </span>
                      </div>
                    ) : (
                      <div className="bg-danger text-white text-center rounded-5 w-100">
                        <span> Not Active </span>
                      </div>
                    )}
                  </td>
                  <td>{user?.phoneNumber}</td>
                  <td>{user?.email}</td>
                  <td>{user?.creationDate.slice(0, 10)}</td>
                  <td>
                    {" "}
                    <i
                      className=" text-white px-2"
                      onClick={() => showViewModel(user.id)}
                    >
                      {" "}
                      <FaEye />{" "}
                    </i>{" "}
                    <i
                      className="  text-muted px-2"
                      onClick={() => putToggleActive(user.id)}
                    >
                      {" "}
                      <MdBlock />
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
      {/* ****************pagination***************** */}
      <Paginations
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      />

      {show && userDetails && (
        <Modal
          className="MStyle"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <h2>{userDetails?.userName}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row  ">
              <div className="col-md-4 my-2">Phone Number :</div>
              <div className="col-md-8 my-2">{userDetails?.phoneNumber} </div>

              <div className="col-md-4 my-2">Email :</div>
              <div className="col-md-8 my-2">{userDetails?.email} </div>
              <div className="col-md-4 my-2">Activated :</div>
              <div className="col-md-8 my-2">
                {userDetails?.isActivated ? (
                  <div className="bg-success text-center text-white w-100  rounded-5">
                    <span> Active </span>
                  </div>
                ) : (
                  <div className="bg-danger text-white text-center rounded-5 w-100">
                    <span> Not Active </span>
                  </div>
                )}{" "}
              </div>
              <div className="col-md-4 my-2">Date :</div>
              <div className="col-md-8 my-2">
                {userDetails?.creationDate?.slice(0, 10)}{" "}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
