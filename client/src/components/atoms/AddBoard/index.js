import React from "react";
import "./index.css";

const AddBoard = props => {
  return (
    <React.Fragment>
      <div
        className="board-card create-board-card"
        onClick={() => props.createNewBoard(true)}
      >
        <span>Create new board...</span>
        <span> + </span>
      </div>
    </React.Fragment>
  );
};

export default AddBoard;
