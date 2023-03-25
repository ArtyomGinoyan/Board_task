import { takeEvery } from "redux-saga/effects";
import { auth, logoutUser } from "./auth/authSaga";
import { loginAction, logoutAction } from "./auth/authSlice";
import {
  handleAddCard,
  handleAddColumn,
  handleData,
  handleMoveCard,
  handleRemoveCard,
  handleUpdateColumnName,
} from "./board/boardSaga";
import {
  addCardAction,
  addColumnAction,
  getDataAction,
  moveCardAction,
  removeCardAction,
  updateColumnNameAction,
} from "./board/boardSlice";

export default function* watchDataSaga() {
  //auth
  yield takeEvery(loginAction.type, auth);
  yield takeEvery(logoutAction.type, logoutUser);
  //get all data
  yield takeEvery(getDataAction.type, handleData);
  //card
  yield takeEvery(addCardAction.type, handleAddCard);
  yield takeEvery(moveCardAction.type, handleMoveCard);
  yield takeEvery(removeCardAction.type, handleRemoveCard);
  //column
  yield takeEvery(addColumnAction.type, handleAddColumn);
  yield takeEvery(updateColumnNameAction.type, handleUpdateColumnName);
}
