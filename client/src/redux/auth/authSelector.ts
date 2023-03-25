import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state;

const userSelector = createSelector(selectSelf, (state) => state.user.user);
const authSelector = createSelector(selectSelf, (state) => state.user.auth);
export { authSelector, userSelector };
