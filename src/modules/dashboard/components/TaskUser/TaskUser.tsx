import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { requestHeader, TASKSURLS } from "../../../../Constants/URLS";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import BoardColumn from "./BoardColumn";
import { toast } from "react-toastify";

interface UserTask  {
  id: string;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done";
};

export default function TaskUser() {
  const [tasks, setTasks] = useState<UserTask[]>([]);

  const getUserTask = useCallback(async () => {
    const { data } = await axios.get<{ data: UserTask[] }>(
      TASKSURLS.getAdd,
      {
        headers: requestHeader(),
        params: { pageSize: 100, pageNumber: 1 },
      }
    );
    setTasks(data.data);
   
    
  }, []);

  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    try {
      await axios.put(
        TASKSURLS.statusUrl(draggableId),
        { status: destination.droppableId },
        {
          headers:  requestHeader(),
          
        }
        
      );
     
      toast.success("Task moved successfully");
      getUserTask();
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const columns = ["ToDo", "InProgress", "Done"] as const;

  return (
    <div className="row  my-5 pt-3 gx-2  justify-content-center">
      <DragDropContext onDragEnd={onDragEnd} >
        {columns.map((col) => (
          <BoardColumn 
            key={col}
            title={col}
            tasks={tasks.filter((t) => t.status === col)}
          />
        ))}
      </DragDropContext>
    </div>
  );
}