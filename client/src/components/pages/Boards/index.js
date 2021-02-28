import React, { Component } from "react";
import { Query } from "react-apollo";
import "./index.css";
import BoardCard from "../../atoms/BoardCard";
import CreateNewBoard from "../../organism/CreateNewBoard";
import AddBoard from "../../atoms/AddBoard";
import BoardHeader from "../../organism/BoardHeader";
import Button from "../../atoms/Button";

import { GET_BOARDS } from "../../../graphql/query";

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNewBoardIsActive: false,
    };
  }

  static Section = ({ boards, createNewBoard }) => (
    <div className="section">
      <Boards.SectionHeader />
      <Boards.BoardsList boards={boards} createNewBoard={createNewBoard} />
    </div>
  );

  static SectionHeader = ({ name }) => (
    <div className="section-header">
      <span className="title">{name}</span>
    </div>
  );

  static SectionHeaderButtons = () => (
    <div className="section-header-buttons">
      <Button background="light" href="/boards" name="Boards" width="90px" />
      <Button background="light" href="/boards" name="Members" width="90px" />
      <Button background="light" href="/boards" name="Settings" width="90px" />
    </div>
  );

  static BoardsList = ({ boards, createNewBoard }) => (
    <div className="boards-list">
      {boards.map(board => (
        <BoardCard key={"b-" + board.name} {...board} />
      ))}
      <AddBoard createNewBoard={createNewBoard} />
    </div>
  );

  static Render = ({ boards, createNewBoard }) => (
    <div className="boards-sections">
      <Boards.Section boards={boards} createNewBoard={createNewBoard} />
    </div>
  );

  handleCreateNewBoard = active => {
    this.setState({ createNewBoardIsActive: active });
  };

  render() {
    return (
      <Query query={GET_BOARDS}>
        {({ error, loading, data }) => {
          if (error) throw error;
          else
            return (
              <div className="boards-page">
                <BoardHeader backgroundColor="#026aa7" />
                <div className="content">
                  {!loading && (
                    <Boards.Render
                      boards={data.getAllBoards}
                      createNewBoard={this.handleCreateNewBoard}
                    />
                  )}
                  {this.state.createNewBoardIsActive && (
                    <CreateNewBoard
                      close={() => this.handleCreateNewBoard(false)}
                    />
                  )}
                </div>
              </div>
            );
        }}
      </Query>
    );
  }
}

export default Boards;
