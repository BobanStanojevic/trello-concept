import React, { Component } from "react";
import "./index.css";
import Button from "../../atoms/Button";

export default class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      active: false,
      createCardValue: "",
    };
  }

  handleInputChange = e => {
    const updatedState = {};
    updatedState[e.target.name] = e.target.value;

    this.setState({ ...updatedState });
  };

  handleFocusClick = e => {
    if (!this.node.contains(e.target)) {
      this.handleActive(false);
    }
  };

  handleActive = isActive => {
    if (isActive) {
      document.addEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ active: true, hover: false });
    } else {
      document.removeEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ active: false });
    }
  };

  handleHover = hover => {
    const { active } = this.state;

    if (!active) {
      this.setState({ hover });
    }
  };

  determineInactiveStyle = () => {
    const { hover } = this.state;
    const style = {};

    if (hover) {
      style.backgroundColor = "rgba(9, 45, 66, .13)";
      style.color = "#17394d";
    } else {
      style.backgroundColor = "rgba(0,0,0,0)";
      style.color = "#6b808c";
    }

    return style;
  };

  renderInactive = () => {
    const style = this.determineInactiveStyle();

    return (
      <div
        className="add-card"
        style={style}
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onClick={() => this.handleActive(true)}
      >
        <span> + </span>
      </div>
    );
  };

  renderActive = () => {
    const { createCardValue } = this.state;

    return (
      <div className="create-card" ref={node => (this.node = node)}>
        <div className="create-card-wrapper">
          <textarea
            placeholder="Enter a title for this card..."
            value={createCardValue}
            name="createCardValue"
            onChange={e => this.handleInputChange(e)}
          />
        </div>
        <div className="controls">
          <Button
            name="Add Card"
            onClick={() => {
              this.props.handleAddCard(this.props.listId, createCardValue);
              this.setState({ createCardValue: "" });
            }}
            width="auto"
            className="add"
            background="#5aac44"
            hoverColor="#519839"
          />
        </div>
      </div>
    );
  };

  render() {
    const { active } = this.state;
    return active ? this.renderActive() : this.renderInactive();
  }
}
