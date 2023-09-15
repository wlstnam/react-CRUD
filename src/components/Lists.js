import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(
  ({ todoData, setTodoData, handleClick, handleEdit, displayMessage }) => {
    const handleEnd = (result) => {
      if (!result.destination) return;

      const newTodoData = [...todoData];
      const [reorderedItem] = newTodoData.splice(result.source.index, 1);

      newTodoData.splice(result.destination.index, 0, reorderedItem);
      setTodoData(newTodoData);
    };

    return (
      <div>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="todo">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoData.map((data, index) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <List
                        handleClick={handleClick}
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        price={data.price}
                        completed={data.completed}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        provided={provided}
                        snapshot={snapshot}
                        handleEdit={handleEdit}
                        displayMessage={displayMessage}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
);

export default Lists;
