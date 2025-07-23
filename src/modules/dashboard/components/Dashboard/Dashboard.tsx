import { useContext, useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import {
  requestHeader,
  TASKSURLS,
  USERSSURLS,
} from "../../../../Constants/URLS";
import axios from "axios";
import { AuthContext } from "../../../../Contxet/AuthContext";
import Pie1 from "../Charts/Pie1/Pie1";
import Pie2 from "../Charts/Pie2/Pie2";
interface count {
  toDo: number;
  inProgress: number;
  done: number;
}
interface active {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

export default function Dashboard() {
  let { loginData }: any = useContext(AuthContext);
  const [tasksCount, setTasksCount] = useState<count>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });
  const [usersCount, setUsersCount] = useState<active>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  });
  /*****************************Task Cound*************************/
  let getTaskCound = async () => {
    try {
      let response = await axios.get(`${TASKSURLS.getCount}`, {
        headers: requestHeader(),
      });
      setTasksCount(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  /*****************************user Cound*************************/

  let getUserCound = async () => {
    try {
      let response = await axios.get(`${USERSSURLS.getCount}`, {
        headers: requestHeader(),
      });
      setUsersCount(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTaskCound();
   if (loginData?.userGroup !== "Employee") {
    getUserCound();
  } 
    
   
  }, [loginData]);

  return (
    <>
      <Header loginData={loginData} />

      <div className="container-fluid my-3 ">
        <div className="row ps-3 two rounded-3  justify-content-evenly   my-3">
          <div className="col-md-5 px-2 bg-white rounded rounded-2  ">
            <div className="border-start border-5 border-warning m-4 w-75 px-2  ">
              <h5>Tasks</h5>
              <p className="mt-2">Lorem ipsum dolor sit amet,consecteture</p>
            </div>
            <div className="row justify-content-evenly align-Items-center text-white">
              <div className="col-md-3 text-center rounded-3 pt-3 one1 bg-danger ">
                <i className="fa-solid fa-clipboard-list fs-1 "></i>
                <p>
                  Tasks <br /> ToDo
                </p>
                <p className="fs-4">{tasksCount.toDo}</p>
              </div>
              <div className="col-md-3  text-center rounded-3  pt-3 one3 bg-warning  ">
                <i className="fa-solid fa-chart-column fs-1 "></i>
                <p>
                  Tasks <br /> InProgress
                </p>
                <p className="fs-4">{tasksCount.inProgress}</p>
              </div>

              <div className="col-md-3  text-center rounded-3 pt-3 one2 bg-success  ">
                <i className="fa-solid fa-clipboard-user fs-1"></i>
                <p>
                  Tasks <br /> Done
                </p>
                <p className="fs-4">{tasksCount.done}</p>
              </div>
            </div>
          </div>
           <div className="col-md-5 px-2 bg-white rounded rounded-2 py-3  ">
            <Pie1/>
           </div>
           </div>
          {loginData?.userGroup !== "Employee" ? (
            <div className="row ps-3 two rounded-3  justify-content-evenly   my-3">
<div className="col-md-5 px-2 bg-white rounded rounded-2  ">
              <div className="border-start border-5 border-warning m-4 w-75 px-2  ">
                <h5>Users</h5>
                <p className="mt-2">Lorem ipsum dolor sit amet,consecteture</p>
              </div>
              <div className="row justify-content-evenly align-Items-center text-white">
                <div className="col-md-3 text-center rounded-3 pt-3 one1 bg-success ">
                  <i className="fa-solid fa-clipboard-list fs-1 "></i>
                  <p>
                    Users <br /> active
                  </p>
                  <p className="fs-4">{usersCount.activatedEmployeeCount}</p>
                </div>
                <div className="col-md-3  text-center rounded-3  pt-3 one3 bg-danger  ">
                  <i className="fa-solid fa-chart-column fs-1 "></i>
                  <p>
                    Users <br /> inactive
                  </p>
                  <p className="fs-4">{usersCount.deactivatedEmployeeCount}</p>
                </div>
              </div>
              <div className="col-md-5 px-2 bg-white rounded rounded-2 py-3  ">
            
           </div>
            </div>
            <div className="col-md-5 px-2 bg-white rounded rounded-2 py-3">
              <Pie2/>
            </div>
            </div>
            
            
            
            
          
          ) : (
           ""
          )}
        </div>
      
    </>
  );
}
