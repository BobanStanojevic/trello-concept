import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./index.css";

import Card from "../../atoms/Card";
import AddCard from "../AddCard";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTitle: props.list.name,
    };
  }

  determineStyle = provided => {
    const { color } = this.props.list;

    return {
      backgroundColor: color,
      ...provided.draggableProps.style,
    };
  };

  renderCards = () => {
    const { cards, list, onCardClick } = this.props;
    const orderedCards = [];

    if (!cards) return null;

    list.cardOrder.forEach(cardId => {
      orderedCards.push(cards.filter(c => c.shortid === cardId)[0]);
    });

    return orderedCards.map((card, index) => (
      <Card
        {...card}
        key={"card-" + card.shortid}
        listId={list.shortid}
        index={index}
        onClick={onCardClick}
      />
    ));
  };

  handleListTitleChange = e => {
    this.setState({ listTitle: e.target.value });
  };

  render() {
    const { shortid } = this.props.list;
    const { position, handleListNameMutation } = this.props;

    return (
      <Draggable draggableId={shortid} index={position} type="list">
        {provided => (
          <div
            className="list"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={this.determineStyle(provided)}
          >
            <div className="header" {...provided.dragHandleProps}>
              <input
                type="text"
                className="list-name"
                value={this.state.listTitle}
                onBlur={() =>
                  handleListNameMutation(shortid, this.state.listTitle)
                }
                onChange={this.handleListTitleChange}
              />
            </div>

            <div className="cards-wrapper">
              <Droppable droppableId={shortid} type="card">
                {provided => (
                  <div
                    className="cards"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.renderCards()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <AddCard
              listId={shortid}
              handleAddCard={this.props.handleAddCard}
            />
          </div>
        )}
      </Draggable>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
};
