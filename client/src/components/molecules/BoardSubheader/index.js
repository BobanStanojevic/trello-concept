import React from "react";
import Button from "../../atoms/Button";
import Modals from "../Modal/Modals";

let BoardSubHeader = ({ title, tempTitle, actions }) => {
  return (
    <div className="sub-header">
      <div className="left-sub-header">
        <Button
          fontSize="18px"
          className="title"
          width="auto"
          refId="btn-board-title"
          name={title}
          background="none"
        >
          <Modals.BoardTitle title={tempTitle} actions={actions.boardTitle} />
        </Button>
      </div>
    </div>
  );
};

export default BoardSubHeader;
