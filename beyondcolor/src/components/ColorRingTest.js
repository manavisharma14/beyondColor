import React, { useState } from "react";

// All rows in correct order
const correctRow1 = [
  "#B2766F", "#A97E4C", "#B17466" , "#A87452", "#A28946", 
  "#A78244", "#AE725F", "#A8794E", "#A8745A", "#9D8E48"
];

const correctRow2 = [
  "#97914b", "#86955c", "#7e9760", "#589480", "#7c9567",
  "#5b947a", "#699a71", "#8d9352", "#649a76", "#529687"
];

const correctRow3 = [
  "#4e9689", "#6090a5", "#7489a7", "#688fa7", "#4a9698",
  "#4c9691", "#6c8aa6", "#52949f", "#4a9696", "#7b84a3"
];

const correctRow4 = [
  "#8484a3", "#b1757f", "#ae7787", "#99819d", "#9f7f98",
  "#8d85a3", "#a9798b", "#9483a0", "#b3757a", "#b37673"
];

const ColorRingTest = () => {
  const [row1, setRow1] = useState([...correctRow1]);
  const [row2, setRow2] = useState([...correctRow2]);
  const [row3, setRow3] = useState([...correctRow3]);
  const [row4, setRow4] = useState([...correctRow4]);
  const [score, setScore] = useState(null);

  const handleDragStart = (e, index, rowId) => {
    e.dataTransfer.setData("dragIndex", index);
    e.dataTransfer.setData("rowId", rowId);
  };

  const handleDrop = (e, dropIndex, rowId) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    const sourceRowId = e.dataTransfer.getData("rowId");

    if (sourceRowId !== rowId) return;

    // Prevent dragging to fixed positions
    if ((rowId === "row1" && dropIndex === 0) || (rowId === "row4" && dropIndex === 9)) return;
    if ((rowId === "row1" && dragIndex === 0) || (rowId === "row4" && dragIndex === 9)) return;

    const rowCopy =
      rowId === "row1"
        ? [...row1]
        : rowId === "row2"
        ? [...row2]
        : rowId === "row3"
        ? [...row3]
        : [...row4];

    [rowCopy[dragIndex], rowCopy[dropIndex]] = [
      rowCopy[dropIndex],
      rowCopy[dragIndex],
    ];

    switch (rowId) {
      case "row1":
        setRow1(rowCopy);
        break;
      case "row2":
        setRow2(rowCopy);
        break;
      case "row3":
        setRow3(rowCopy);
        break;
      case "row4":
        setRow4(rowCopy);
        break;
      default:
        break;
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const calculateScore = async () => {
    const response = await fetch("http://localhost:5001/api/hue/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row1, row2, row3, row4 }), // Send the rows to the backend
    });
  
    if (!response.ok) {
      console.error("Failed to fetch score");
      return;
    }
  
    const data = await response.json();
    setScore(data.score); // Set the score from the backend
  };
  

  const renderRow = (row, rowId) => (
    <div className="bg-gray-100 p-2 mb-4">
      <div className="flex border border-gray-300">
        {row.map((color, index) => {
          const isFixed =
            (rowId === "row1" && index === 0) || (rowId === "row4" && index === 9);

          return (
            <div
              key={`${rowId}-${index}`}
              draggable={!isFixed}
              onDragStart={(e) => !isFixed && handleDragStart(e, index, rowId)}
              onDrop={(e) => handleDrop(e, index, rowId)}
              onDragOver={handleDragOver}
              style={{
                backgroundColor: color,
                width: "40px",
                height: "40px",
                border: "1px solid black",
              }}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center pt-10 px-4">
      <h1 className="text-3xl font-semibold mb-8">What's My Color IQ?</h1>

      {renderRow(row1, "row1")}
      {renderRow(row2, "row2")}
      {renderRow(row3, "row3")}
      {renderRow(row4, "row4")}

      <button
        onClick={calculateScore}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Submit & Get Score
      </button>

      {score !== null && (
        <p className="mt-4 text-lg text-green-600 font-medium">
          Your Average Color IQ Score: {score}%
        </p>
      )}
    </div>
  );
};

export default ColorRingTest;


/*


[
  "#B2766F", 
  "#B17466" ,
  "#AE725F", 
  "#A8745A",
  "#A87452", 
  "#A8794E", 
  "#A97E4C",
  "#A78244", 
  "#A28946", 
  "#9D8E48"
];

  [
    "#97914b", 
    "#8d9352", 
    "#86955c",  
    "#7e9760", 
    "#7c9567",
    "#699a71", 
    "#649a76",
    "#5b947a", 
    "#589480", 
    "#529687"
  ];
  


  [
    "#4e9689",
    "#4c9691", 
    "#4a9696",
    "#4a9698",
    "#52949f", 
    "#6090a5", 
    "#688fa7", 
    "#6c8aa6", 
    "#7489a7", 
    "#7b84a3"
  ];



  [
    "#8484a3", 
    "#8d85a3",
    "#9483a0", 
    "#99819d", 
    "#9f7f98",
    "#a9798b", 
    "#ae7787", 
    "#b1757f", 
    "#b3757a", 
    "#b37673"
  ];

  */