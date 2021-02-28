import React, { Component } from "react";
import "./index.css";
import Button from "../../atoms/Button";

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDetailsListener: false,
      descriptionIsActive: false,
      cardName: "",
    };
  }

  toggleDescriptionView = isActive => {
    this.setState({ descriptionIsActive: isActive });
  };

  static Button = ({ title, onClick }) => (
    <button onClick={onClick} className="card-details-button">
      <span className="title">{title}</span>
    </button>
  );

  static CardHeader = ({
    name,
    close,
    onChange,
    handleCardNameMutation,
    cardId,
  }) => (
    <div className="header">
      <div className="title-info">
        <input
          type="text"
          className="name"
          value={name}
          onChange={e => onChange(e)}
          onBlur={() => handleCardNameMutation({ cardId, name })}
        />
      </div>
      <div className="close">
        <Button width="32px" height="32px" name="X" onClick={close} />
      </div>
    </div>
  );

  static CardButtons = ({ actions }) => {
    return (
      <div className="sidebar-buttons">
        <span className="section-title">ACTIONS</span>
        <div className="section">
          <CardDetails.Button title="Delete" onClick={actions.deleteCard} />
        </div>
        <Button
          name="Share and more..."
          background="none"
          width="168px"
          weight="400"
          extraStyles={{ justifyItems: "left" }}
          fontColor="#6b808c"
        />
      </div>
    );
  };

  static Labels = () => {
    const labels = [
      { name: "Open", color: "#c377e0" },
      { name: "Done", color: "#51e898" },
    ];

    return (
      <div className="card-labels">
        <span className="content-soft-title">LABELS</span>
        <div className="labels">
          {labels.map((l, i) => (
            <CardDetails.Label key={i} {...l} />
          ))}
        </div>
      </div>
    );
  };

  static Label = ({ name, color }) => (
    <span className="card-label" style={{ backgroundColor: color }}>
      {name}
    </span>
  );

  static Description = ({ active, description, onClick }) => {
    if (active) {
      return (
        <div className="section description">
          <span className="content-title">Description</span>
          <div className="content">
            <textarea
              value={description}
              placeholder="Add a more detailed description..."
            />
            <div className="controls">
              <Button
                className="save-description"
                name="Save"
                background="#5aac44"
                hoverColor="#519839"
                extraStyles={{
                  boxShadow: "0 1px 0 0 #3f6f21",
                  padding: "0 6px",
                }}
                width="fit-content"
              />

              <Button
                className="formatting-help"
                name="Formatting help"
                background="rgba(9, 45, 66, .08)"
                hoverColor="rgba(9, 45, 66, .13)"
                fontColor="#6b808c"
                weight="400"
                extraStyles={{
                  textDecoration: "underline",
                  textDecorationColor: "#6b808c",
                }}
                width="fit-content"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="section description">
          <span className="content-title">Description</span>
          <div className="content">
            <button className="show-description" onClick={() => onClick(true)}>
              <span>Add a more detailed description...</span>
            </button>
          </div>
        </div>
      );
    }
  };

  static WriteComment = () => (
    <div className="section comment">
      <span className="content-title">Add Comment</span>
      <div className="content">
        <div className="textarea-wrapper">
          <textarea placeholder="Write a comment..."></textarea>
        </div>
        <Button
          className="save-comment"
          name="Save"
          background="#5aac44"
          hoverColor="#519839"
          extraStyles={{ boxShadow: "0 1px 0 0 #3f6f21", padding: "0 6px" }}
          width="fit-content"
        />
      </div>
    </div>
  );

  componentDidUpdate = () => {
    const { open, card } = this.props;
    const { cardDetailsListener } = this.state;

    if (open && !cardDetailsListener) {
      document.addEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ cardDetailsListener: true, cardName: card.name });
    } else if (!open && cardDetailsListener) {
      document.removeEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ cardDetailsListener: false });
    }
  };

  handleFocusClick = e => {
    if (this.cardDetails.contains(e.target)) return;
    this.props.closeCardDetails();
  };

  handleCardNameChange = e => {
    this.setState({ cardName: e.target.value });
  };

  render() {
    const { open, card, closeCardDetails, actions } = this.props;
    const { descriptionIsActive } = this.state;

    const cardButtonActions = {
      deleteCard: () =>
        actions.buttons.deleteCard({
          cardId: card.shortid,
          listId: card.listId,
        }),
    };

    if (!open) return null;
    return (
      <div className="card-details-wrapper">
        <div
          ref={cardDetails => (this.cardDetails = cardDetails)}
          className="card-details"
        >
          <CardDetails.CardHeader
            close={closeCardDetails}
            name={this.state.cardName}
            handleCardNameMutation={actions.handleCardNameMutation}
            cardId={card.shortid}
            onChange={this.handleCardNameChange}
          />
          <div className="main-content">
            <CardDetails.Labels />
            <CardDetails.Description
              description={card.description}
              active={descriptionIsActive}
              onClick={this.toggleDescriptionView}
            />
            <CardDetails.WriteComment />
          </div>
          <CardDetails.CardButtons actions={cardButtonActions} />
        </div>
      </div>
    );
  }
}

export default CardDetails;
