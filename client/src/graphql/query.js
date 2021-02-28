import { gql } from "apollo-boost";

const GET_BOARD = gql`
  query($id: String!) {
    getBoard(id: $id) {
      name
      shortid
      color
      lists {
        shortid
        color
        name
        cardOrder
      }
      cards {
        name
        shortid
        description
      }
      listOrder
    }
  }
`;

const GET_BOARDS = gql`
  {
    getAllBoards {
      name
      shortid
      color
    }
  }
`;

export { GET_BOARD, GET_BOARDS };
