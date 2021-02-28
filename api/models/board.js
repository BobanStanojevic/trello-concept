import mongoose from "mongoose";
import nanoid from "nanoid";

const List = new mongoose.Schema({
  shortid: {
    type: String,
    default: () => nanoid(8),
  },
  color: {
    type: String,
    default: () => "#dfe3e6",
  },
  name: String,
  cardOrder: [String],
});

const Card = new mongoose.Schema({
  shortid: {
    type: String,
    default: () => nanoid(8),
  },
  name: String,
  description: String,
});

const boardSchema = new mongoose.Schema({
  shortid: {
    type: String,
    default: () => nanoid(8),
  },
  name: String,
  color: String,
  lists: [List],
  cards: [Card],
  listOrder: [String],
});

module.exports = mongoose.model("Board", boardSchema);
