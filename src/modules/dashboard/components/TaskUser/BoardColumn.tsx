import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd"; 

type Task = {
  id: string;
  title: string;
  description: string;
};

export default function BoardColumn({
  title,
  tasks,
}: {
  title: string;
  tasks: Task[];
}) {
  return (
   
      <div className="col-md-3 bg-success  rounded rounded-3 mx-3 text-center">
      <h3 className="title my-3 text-white">{title}</h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            className="bg-dark-green rounded-4 p-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: "300px" }}
          >
            {tasks.map((task, index) => (
              <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                {(provided) => (
                  <div
                    className="task bg-warning rounded-2 text-white mb-2 p-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p>{task.title}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
   
    
  );
}