import React from "react";
import "./index.css";
import Button from "../../atoms/Button";

const BoardHeader = props => {
  return (
    <header
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "rgba(0,0,0,.15)",
      }}
    >
      <Button background="light" href="/" name="Boards" width="90px" />
    </header>
  );
};

export default BoardHeader;
