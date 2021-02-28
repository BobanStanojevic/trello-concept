export default `
type Board {
  shortid: String!
  id: String!
  color: String!
  name: String!
  lists: [List]
  cards: [Card]
  listOrder: [String]
}
type Card {
  shortid: String!
  id: String!
  name: String!
  description: String!
}
type List {
  shortid: String!
  id: String!
  name: String!
  color: String!
  cardOrder: [String]
}
input ListInput {  
  shortid: String
  name: String
  color: String
  cardOrder: [String]!
}
input CardInput {
  shortid: String!
  name: String!
  description: String
}
type Query {
  getBoard(id: String!): Board!
  getAllBoards: [Board!]
}
type Mutation {
  createBoard(name: String!, color: String!, shortid: String!): String!
  resetBoardDB: [Board]!
  updateLists(boardId: String!, cards: [CardInput!], lists: [ListInput!], listOrder: [String!]): String!
  updateBoardName(boardId: String!, name: String!): String!
}
`;
