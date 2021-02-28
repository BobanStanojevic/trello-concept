import React, { Component } from "react";
import Modal from "./index.js";
import Button from "../../atoms/Button";

export default class Modals extends Component {
  static BoardTitle = props => {
    return (
      <Modal {...props} width="305px">
        <Modal.Header title="Rename Board" />
        <Modal.Footer>
          <Modal.Input
            label="Name"
            value={props.title}
            onChange={props.actions.handleBoardNameChange}
          />
          <Button
            name="Rename"
            onClick={props.actions.handleBoardNameMutation}
            background="#5aac44"
            hoverColor="#519839"
            fontColor="#fff"
            width="fit-content"
            extraStyles={{
              padding: "0 12px",
              marginLeft: "12px",
              marginBottom: "12px",
            }}
          />
        </Modal.Footer>
      </Modal>
    );
  };
}
