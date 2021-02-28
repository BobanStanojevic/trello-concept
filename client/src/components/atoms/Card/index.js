import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./index.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  handleToggleHover = isHovered => {
    this.setState({ hover: isHovered });
  };

  determineStyle = provided => {
    return {
      backgroundColor: this.state.hover ? "#f5f6f7" : "#fff",
      ...provided.draggableProps.style,
    };
  };

  render() {
    let { name, shortid, index, onClick } = this.props;

    return (
      <Draggable key={shortid} draggableId={shortid} index={index} type="card">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="card"
            onMouseEnter={() => this.handleToggleHover(true)}
            onMouseLeave={() => this.handleToggleHover(false)}
            style={this.determineStyle(provided)}
            onClick={() => onClick(this.props)}
          >
            <span>{name}</span>
            <span>Edit</span>
          </div>
        )}
      </Draggable>
    );
  }
}
