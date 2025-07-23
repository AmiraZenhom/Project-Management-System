import  { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

import { requestHeader, TASKSURLS } from "../../../../../Constants/URLS";

interface Count {
  toDo: number;
  inProgress: number;
  done:number;

};
export default function Pie1() {

  const [tasksCount, setTasksCount] = useState<Count | null>(null);

  const getTasksCount = () => {
    axios
      .get(`${TASKSURLS.getCount}`, {
        headers: requestHeader(),
      })
      .then((response) => {
        setTasksCount(response?.data);
        console.log(response?.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasksCount();
  }, []);
    // const {toDo,inprogress,done} =
    //   tasksCount
    // ;

  const data = [
    { name: "ToDo", value: tasksCount?.toDo },
    { name: "inProgress", value: tasksCount?.inProgress },
    { name: "Done", value: tasksCount?.done },
  ];

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

  const COLORS = ["#dc3545", "#ffc107", "#198754"];
  return (
    <>
      <div className="chart text-center  mb-3">
        <div className="text-center mx-5 px-5 ">
             {tasksCount ?( <PieChart width={250} height={220}>
            <Pie
              dataKey="value"
              data={data}
              cx={120}
              cy={100}
              innerRadius={60}
              outerRadius={105}
              fill="#8884d8"
              paddingAngle={5}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((index:any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>):("")}
         
        </div>
        <div className="row  ">
          <div className="col-md-4 ">
            <span>
              <i className="fa-solid fa-circle text-danger pe-2 "></i>
            </span>
            <span className="text-danger">ToDo</span>
          </div>
          <div className="col-md-4">
            <span>
              <i className="fa-solid fa-circle text-warning  pe-2 "></i>
            </span>
            <span className="text-warning">InProgress</span>
          </div>
          <div className="col-md-4">
            <span>
              <i className="fa-solid fa-circle text-success  pe-2  "></i>
            </span>
            <span className=" text-success">Done</span>
          </div>
        </div>

      
      </div>
    </>
  );
}
