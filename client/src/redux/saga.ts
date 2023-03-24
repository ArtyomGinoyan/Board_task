import { takeEvery } from "redux-saga/effects";
import { auth, logoutUser } from "./auth/authSaga";
import { loginAction, logoutAction } from "./auth/authSlice";
import {
  handleAddCard,
  handleAddColumn,
  handleData,
  handleMoveCard,
  handleUpdateColumnName,
} from "./board/boardSaga";
import {
  addCardAction,
  addColumnAction,
  getDataAction,
  moveCardAction,
  updateColumnNameAction,
} from "./board/boardSlice";

export default function* watchDataSaga() {
  //auth
  console.log("kkkkk");

  yield takeEvery(loginAction.type, auth);
  yield takeEvery(logoutAction.type, logoutUser);
  yield takeEvery(getDataAction.type, handleData);
  yield takeEvery(addCardAction.type, handleAddCard);
  yield takeEvery(moveCardAction.type, handleMoveCard);
  yield takeEvery(addColumnAction.type, handleAddColumn);
  yield takeEvery(updateColumnNameAction.type, handleUpdateColumnName);
}
