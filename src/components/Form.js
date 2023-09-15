import React from "react";

export default function Form({
  handleSubmit,
  item,
  setItem,
  price,
  setPrice,
  isEditing,
}) {
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-2">
      <div className="flex items-center space-x-4">
        {" "}
        <div className="flex flex-col">
          <label htmlFor="item-input" className="mb-2 text-orange-300">
            지출항목
          </label>{" "}
          <input
            id="item-input"
            type="text"
            name="item"
            placeholder="예)렌트비"
            className="w-full px-1 py-2 border-b border-gray-500 rounded-none focus:outline-none focus:border-lime-700"
            value={item}
            onChange={handleItemChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price-input" className="mb-2 text-orange-300">
            비용
          </label>{" "}
          <input
            id="price-input"
            type="text"
            name="price"
            placeholder="0"
            className="w-full px-1 py-2 border-b border-gray-500 rounded-none focus:outline-none focus:border-lime-700"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      <input
        type="submit"
        value={isEditing ? "수정" : "입력"}
        className="w-1/5 mt-2 mb-7 p-2 text-white border-2 border-none bg-lime-700 rounded hover:scale-110 duration-300"
      />
    </form>
  );
}
