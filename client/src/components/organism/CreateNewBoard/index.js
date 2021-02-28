import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { nanoid } from "nanoid";
import "./index.css";
import Button from "../../atoms/Button";
import { CREATE_BOARD } from "../../../graphql/mutations.js";

let createBoardMutation;

class CreateNewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      color: "rgb(0, 121, 191)",
      selectedBackground: 0,
      listener: false,
    };
  }

  Backgrounds = ({ selected, handlerOnClick }) => {
    const colors = [
      "rgb(0, 121, 191)",
      "rgb(210, 144, 52)",
      "rgb(81, 152, 57)",
      "rgb(176, 70, 50)",
      "rgb(137, 96, 158)",
      "rgb(205, 90, 145)",
      "rgb(75, 191, 107)",
      "rgb(0, 174, 204)",
      "rgb(131, 140, 145)",
    ];

    return colors.map((c, i) => (
      <div
        key={i}
        className={`option ${i === selected ? "selected" : ""}`}
        style={{ backgroundColor: c }}
        onClick={() => handlerOnClick(c, i)}
      >
        <div className="hover-overlay"></div>
      </div>
    ));
  };

  handleCreateBoard = async () => {
    const shortid = nanoid(8);
    this.props.close();

    await createBoardMutation({
      variables: {
        name: this.state.title,
        color: this.state.color,
        shortid,
      },
    });
    this.props.history.push(`/${shortid}`);
  };

  handleBackgroundSelected = (color, selectedBackground) => {
    this.setState({ color, selectedBackground });
  };

  handleInputChange = e => {
    this.setState({ title: e.target.value });
  };

  handleFocusClick = e => {
    if (!this.modal.contains(e.target)) {
      this.props.close();
    }
  };

  componentDidMount = () => {
    const { listener } = this.state;

    if (listener) return;
    document.addEventListener("mousedown", this.handleFocusClick, false);
    this.setState({ listener: true });
  };

  componentWillUnmount = () => {
    const { listener } = this.state;

    if (!listener) return;
    document.removeEventListener("mousedown", this.handleFocusClick, false);
    this.setState({ listener: false });
  };

  render() {
    return (
      <React.Fragment>
        <Mutation mutation={CREATE_BOARD}>
          {createBoard => {
            createBoardMutation = createBoard;

            return (
              <div
                className="create-new-board"
                ref={modal => (this.modal = modal)}
              >
                <div
                  className="board-fields"
                  style={{ backgroundColor: this.state.color }}
                >
                  <input
                    type="text"
                    placeholder="Add board title"
                    name="title"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.title}
                  />
                </div>
                <div className="board-background">
                  <this.Backgrounds
                    selected={this.state.selectedBackground}
                    handlerOnClick={this.handleBackgroundSelected}
                  />
                </div>
                <div className="create-board">
                  <Button
                    width="112px"
                    background="#5aac44"
                    hoverColor="#519839"
                    onClick={this.handleCreateBoard}
                    name="Create Board"
                    color="#fff"
                  />
                </div>
              </div>
            );
          }}
        </Mutation>
        <div className="create-new-board-background-overlay"></div>
      </React.Fragment>
    );
  }
}

export default withRouter(CreateNewBoard);
