import { Board } from "../models";
export default {
  Query: {
    getAllBoards: async () => {
      const boards = await Board.find();
      return boards;
    },
    getBoard: async (parent, args, context, info) => {
      const board = await Board.find({ shortid: args.id });
      return board[0];
    },
  },
};
