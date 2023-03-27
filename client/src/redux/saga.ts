import { takeEvery } from 'redux-saga/effects';
import { auth, logoutUser, updateProfile } from './auth/authSaga';
import { loginAction, logoutAction, updateProfileAction } from './auth/authSlice';
import {
	handleAddCard,
	handleAddColumn,
	handleData,
	handleMoveCard,
	handleRemoveCard,
	handleResetData,
	handleUpdateCard,
	handleUpdateColumnName,
} from './board/boardSaga';
import {
	addCardAction,
	addColumnAction,
	getDataAction,
	moveCardAction,
	removeCardAction,
	resetDataAction,
	updateCardAction,
	updateColumnNameAction,
} from './board/boardSlice';
import { handleOwnerData, handleResetOwnerData } from './cardOwner/cardOwnerSaga';
import { getOwnerAction, resetOwnerDataAction } from './cardOwner/cardOwnerSlice';

export default function* watchDataSaga() {
	//auth
	yield takeEvery(loginAction.type, auth);
	yield takeEvery(logoutAction.type, logoutUser);
	yield takeEvery(updateProfileAction.type, updateProfile);
	//all data actions
	yield takeEvery(getDataAction.type, handleData);
	yield takeEvery(resetDataAction.type, handleResetData);
	//owner data actions
	yield takeEvery(getOwnerAction.type, handleOwnerData);
	yield takeEvery(resetOwnerDataAction.type, handleResetOwnerData);
	//card
	yield takeEvery(addCardAction.type, handleAddCard);
	yield takeEvery(moveCardAction.type, handleMoveCard);
	yield takeEvery(updateCardAction.type, handleUpdateCard);
	yield takeEvery(removeCardAction.type, handleRemoveCard);
	//column
	yield takeEvery(addColumnAction.type, handleAddColumn);
	yield takeEvery(updateColumnNameAction.type, handleUpdateColumnName);
}
