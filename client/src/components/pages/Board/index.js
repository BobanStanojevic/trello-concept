import React from "react";
import { Query } from "react-apollo";
import { GET_BOARD } from "../../../graphql/query.js";
import BoardContent from "../../organism/BoardContent";

const Board = props => (
  <Query
    query={GET_BOARD}
    variables={{ id: props.location.pathname.split("/")[1] }}
  >
    {({ loading, error, data }) => {
      if (error) throw error;
      if (loading) return <div>Loading</div>;
      if (!loading) return <BoardContent board={data.getBoard} />;
    }}
  </Query>
);

export default Board;
