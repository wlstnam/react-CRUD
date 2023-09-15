import React, { useState } from "react";

const List = ({
  id,
  title,
  price,
  todoData,
  setTodoData,
  provided,
  snapshot,
  handleEdit,
  displayMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));

    displayMessage("항목이 삭제되었습니다!");
  };

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = () => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between w-full px-4 py-1 my-1 text-gray-600 bg-gray-100 border rounded row">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full px-3 py-2 mr-4 text-gray-500 appearance-none"
            value={editedTitle}
            onChange={handleEditChange}
            autoFocus
          />
        </form>
        <div className="items-center">
          <button
            class="px-4 py-2 float-right"
            onClick={() => setIsEditing(false)}
            type="button"
          >
            x
          </button>
          <button
            onClick={handleSubmit}
            class="px-4 py-2 float-right"
            type="submit"
          >
            save
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-100" : "bg-white"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded hover:scale-105 duration-300`}
      >
        <div className="items-center">
          {title}
          {
            "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
          }
          {price}
        </div>
        <div className="items-center">
          <button
            className="float-right px-4 py-2"
            onClick={() => handleClick(id)}
          >
            x
          </button>
          <button
            className="float-right px-4 py-2"
            onClick={() => handleEdit(id, title, price)}
          >
            edit
          </button>
        </div>
      </div>
    );
  }
};

export default List;
