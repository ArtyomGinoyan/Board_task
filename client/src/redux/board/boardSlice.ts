import { createSlice, current } from "@reduxjs/toolkit";
import { el } from "../../pages/board/Board";

const initialState = {
  column: [] as el[],
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    getDataAction() {},
    getDataSuccess(state, action) {
      state.column = action.payload;
    },
    addCardAction(state, action) {},
    addCard(state, action) {
      const sourceCards = state.column.filter(
        (column) => column.id === action.payload.columnId,
      );
      sourceCards[0].cards.push(action.payload);
    },
    addColumnAction(state, action) {},
    addColumn(state, action) {
      state.column.push(action.payload);
    },
    updateColumnNameAction(state, action) {},
    updateColumnName(state, action) {
      const column = state.column.filter(
        (column) => column.id === action.payload.id,
      );
      column[0].title = action.payload.title;
    },
    removeCardAction(state, action) {},
    removeCard(state, action) {
      const { columnId, position } = action.payload;
      const sourceCards = state.column.filter(
        (column) => column.id === +columnId,
      );
      sourceCards[0].cards.splice(position, 1);
      sourceCards[0].cards.forEach((el) => {
        if (el.position > position) {
          el.position = el.position - 1;
        }
      });
      // const cardIndex = state.findIndex(
      //   (card) => card.id === action.payload
      // );
      // if (cardIndex !== -1) {
      //   state.splice(cardIndex, 1);
      // }
    },
    updateCardTitle(state, action) {
      // const cardIndex = state.findIndex(
      //   (card) => card.id === action.payload.id
      // );
      // if (cardIndex !== -1) {
      //   state[cardIndex].title = action.payload.title;
      // }
    },
    moveCardAction(state, action) {},
    moveCard(state, action) {
      console.log(current(state.column));

      const { source, destination } = action.payload;

      const sourceCards = state.column.filter(
        (column) => column.id === +source.droppableId,
      );

      const destinationCards = state.column.filter(
        (column) => column.id === +destination.droppableId,
      );

      const [movedCard] = sourceCards[0].cards.splice(source.index, 1);

      movedCard.columnId = +destination.droppableId;
      movedCard.position = destination.index;

      sourceCards[0].cards.forEach((el) => {
        if (el.position > source.index) {
          el.position = el.position - 1;
        }
      });
      destinationCards[0].cards.forEach((el) => {
        if (el.position >= destination.index) {
          el.position = el.position + 1;
        }
      });

      destinationCards[0].cards.splice(destination.index, 0, movedCard);
    },
  },
});

export const {
  moveCard,
  moveCardAction,
  getDataAction,
  getDataSuccess,
  addCard,
  addCardAction,
  addColumn,
  addColumnAction,
  updateColumnName,
  updateColumnNameAction,
  removeCard,
  removeCardAction,
} = boardSlice.actions;
export default boardSlice;
