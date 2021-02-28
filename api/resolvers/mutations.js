import { Board } from "../models";

export default {
  Mutation: {
    createBoard: async (_, args) => {
      let statusMessage = "";

      await new Board(args).save(err => {
        if (err) {
          console.err(err);
          statusMessage = err;
        } else {
          statusMessage = "Success!";
        }
      });

      return statusMessage;
    },
    updateLists: async (_, args) => {
      let statusMessage;

      let board = await Board.findOne({ shortid: args.boardId }, err => {
        statusMessage = "Success";
        if (err) statusMessage = `${err}`;
      });

      if (args.lists) board.lists = args.lists;
      if (args.listOrder) board.listOrder = args.listOrder;
      if (args.cards) board.cards = args.cards;

      await board.save();
      return statusMessage;
    },
    resetBoardDB: async () => Board.remove({}),
    updateBoardName: async (_, args) => {
      let statusMessage;

      let board = await Board.findOne({ shortid: args.boardId }, err => {
        statusMessage = "success";
        if (err) statusMessage = `${err}`;
      });

      board.name = args.name;

      await board.save();
      return statusMessage;
    },
  },
};
