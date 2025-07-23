import  {  useEffect, useState } from "react";
import axios from "axios";

import { PieChart, Pie, Cell} from "recharts";
import { requestHeader, USERSSURLS } from "../../../../../Constants/URLS";
interface Count {
  activatedEmployeeCount: number;
 deactivatedEmployeeCount: number;
  

};
export default function Pie2() {
  

  const [usersCount, setUsersCount] =useState<Count | null>(null);

  const getUsersCount = () => {
    axios
      .get(`${USERSSURLS.getCount}`, {
        headers: requestHeader(),
      })
      .then((response) => {
        setUsersCount(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const {toDo,inprogress,done} =
  //     tasksCount
  //   ;
  useEffect(() => {
    getUsersCount();
  }, []);

  const data = [
    {
      name: "activatedEmployeeCount",
      value: usersCount?.activatedEmployeeCount,
    },
    {
      name: "deactivatedEmployeeCount",
      value: usersCount?.deactivatedEmployeeCount,
    },
  ];

  const COLORS = ["#dc3545",  "#198754"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="dark"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <div className="text-center  px-5  ">
        <div className="chart mx-5 ">
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx={120}
              cy={100}
              innerRadius={60}
              outerRadius={105}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((data, item) => (
                <Cell key={data.name} fill={COLORS[item % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="row mb-3 ">
          <div className="col-md-6 text-success">
            <span>
              <i className="fa-solid fa-circle text-success pe-2 "></i> Activated
            </span>
          </div>
          <div className="col-md-6 text-danger ">
            <span>
              <i className="fa-solid fa-circle text-danger  pe-2 "></i>{" "}
              Deactivated
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
