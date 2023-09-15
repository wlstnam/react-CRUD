import React, { useState, useCallback } from "react";
import "./App.css";
import List from "./components/Lists";
import Form from "./components/Form";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const totalCost = todoData.reduce(
    (acc, curr) => acc + parseFloat(curr.price || 0),
    0
  );

  const displayMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleRemoveClick = () => {
    setTodoData([]);
    displayMessage("항목이 모두 삭제되었습니다!");
  };

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
    },
    [todoData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      let updatedTodos = todoData.map((todo) => {
        if (todo.id === editingId) {
          return {
            ...todo,
            title: item,
            price: price,
          };
        }
        displayMessage("항목이 수정되었습니다!");
        return todo;
      });

      setTodoData(updatedTodos);
      setIsEditing(false);
      setEditingId(null);
    } else {
      let newTodo = {
        id: Date.now(),
        title: item,
        price: price,
        completed: false,
      };

      setTodoData((prev) => [...prev, newTodo]);
      displayMessage("항목이 추가되었습니다!");
    }

    setItem("");
    setPrice("");
  };

  const handleEdit = (id, title, price) => {
    setIsEditing(true);
    setEditingId(id);
    setItem(title);
    setPrice(price);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-orange-200">
      <div className="text-4xl">예산 계산기</div>
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3"></div>

        {showMessage && (
          <div className="fixed top-0 left-0 w-full p-4 bg-green-400 text-white text-center">
            {message}
          </div>
        )}

        <Form
          handleSubmit={handleSubmit}
          item={item}
          setItem={setItem}
          price={price}
          setPrice={setPrice}
          isEditing={isEditing}
        />

        <List
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
          handleEdit={handleEdit}
          displayMessage={displayMessage}
        />

        <button
          onClick={handleRemoveClick}
          className="w-1/5 mt-2 mb-7 p-2 text-white border-2 border-none bg-lime-700 rounded hover:scale-110 duration-300"
        >
          목록 지우기
        </button>
        <div className="mt-4 text-right">총 지출 : {totalCost}원</div>
      </div>
    </div>
  );
}
