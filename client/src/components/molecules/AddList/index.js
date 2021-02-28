import React, { Component } from "react";
import "./index.css";

import Button from "../../atoms/Button";

export default class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      listener: false,
      hover: false,
      listNameValue: "",
    };
  }

  componentDidUpdate = () => {
    const { active, listener } = this.state;

    if (active && !listener) {
      document.addEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ listener: true });
    } else if (!active && listener) {
      document.removeEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ listener: false });
    }
  };

  componentWillUnmount = () => {
    if (!this.state.listener) return;
    document.removeEventListener("mousedown", this.handleFocusClick, false);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const updatedState = {};

    updatedState[name] = value;
    this.setState({ ...updatedState });
  };

  handleHover = isHovering => {
    const { active } = this.state;
    if (active) return;
    this.setState({ hover: isHovering });
  };

  handleFocusClick = e => {
    if (this.node.contains(e.target)) return;
    this.handleActive(false);
  };

  handleActive = isActive => {
    if (isActive) {
      this.setState({ active: true, hover: false }, () => {
        this.focusInput.focus();
      });
    } else {
      this.setState({ active: false, hover: false });
    }
  };

  determineInactiveStlye = () => {
    const { hover } = this.state;

    const hoverStyle = {
      backgroundColor: "rgba(0, 0, 0, .24)",
    };

    const defaultStyle = {
      backgroundColor: "rgba(0, 0, 0, .12)",
    };

    return hover ? hoverStyle : defaultStyle;
  };

  renderInactive = () => {
    return (
      <div
        style={this.determineInactiveStlye()}
        className="add-list"
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onClick={() => this.handleActive(true)}
      >
        <span> + </span>
        <span>Add another list</span>
      </div>
    );
  };

  renderActive = () => {
    return (
      <form className="adding-list" ref={node => (this.node = node)}>
        <input
          type="text"
          name="listNameValue"
          placeholder="Enter list title..."
          ref={focusInput => (this.focusInput = focusInput)}
          value={this.state.listNameValue}
          onChange={e => this.handleInputChange(e)}
        />
        <div className="controls">
          <Button
            name="Add List"
            onClick={() => {
              this.props.handleAddList(this.state.listNameValue);
              this.setState({ listNameValue: "" });
            }}
            width="auto"
            type="submit"
            className="add"
            background="#5aac44"
            hoverColor="#519839"
          />
        </div>
      </form>
    );
  };

  render() {
    let { active } = this.state;

    return (
      <div className="add-list-wrapper">
        {active && this.renderActive()}
        {!active && this.renderInactive()}
      </div>
    );
  }
}
