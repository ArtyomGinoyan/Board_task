import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state;

const dataSelector = createSelector(selectSelf, (state) => state.board.column);

export { dataSelector };
