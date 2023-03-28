import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router';

import addCardService from '../../services/addCardService';
import getDataService from '../../services/getDataService';
import moveCardService from '../../services/moveCardService';
import addColumnService from '../../services/addColumnService';
import updateCardService from '../../services/updateCardService';
import removeCardService from '../../services/removedCardService';
import updateColumnNameService from '../../services/updateColumnNameService';

import { el } from '../../pages/board/Board';
import { checkAuthorizedStatus, DataNavigate } from '../auth/authSaga';
import { Column, ColumnData } from '../../types/columnTypes';
import { Card, FullCardData, MovedData, UpdateCard } from '../../types/cardTypes';

import {
	addCard,
	addColumn,
	getDataSuccess,
	moveCard,
	removeCard,
	resetData,
	updateCardSuccess,
	updateColumnName,
} from './boardSlice';

export interface Data {
	type: string;
	payload: MovedData;
}
export interface CardData {
	type: string;
	payload: Card;
}
export interface RemovedData {
	type: string;
	payload: {
		cardData: FullCardData;
		navigate: NavigateFunction;
	};
}
export interface UpdateCardData {
	type: string;
	payload: UpdateCard;
}

export function* handleMoveCard(data: Data) {
	try {
		yield put(moveCard(data.payload));
		const response: Response = yield call(moveCardService, {
			id: data.payload.cardId,
			source: data.payload.source,
			destination: data.payload.destination,
			newPosition: data.payload.destination.index,
		});
		yield checkAuthorizedStatus({
			message: 'Move card failed',
			response: response,
			navigate: data.payload.navigate,
		});
	} catch (error) {
		console.log(error);
	}
}

export function* handleRemoveCard(Params: RemovedData) {
	try {
		const { cardData, navigate } = Params.payload;
		const response: Response = yield call(removeCardService, {
			id: cardData.id,
			columnId: cardData.columnId,
			position: cardData.position,
			userId: cardData.userId,
		});
		yield checkAuthorizedStatus({
			message: 'Remove card failed',
			response: response,
			navigate: navigate,
		});
		yield put(removeCard(cardData));
		toast.success('Remove card successfully');
	} catch (error) {
		toast.error('Remove card failed');
	}
}

export function* handleData(params: DataNavigate) {
	try {
		const response: Response = yield call(getDataService);
		yield checkAuthorizedStatus({
			message: 'Data get failed',
			response: response,
			navigate: params.payload,
		});

		const data: el[] = yield response.json() as Promise<el[]>;

		yield put(getDataSuccess(data));
	} catch (error) {
		toast.error('Data get failed');
	}
}

export function* handleAddCard(data: CardData) {
	try {
		const response: Response = yield call(addCardService, data.payload);

		yield checkAuthorizedStatus({
			message: 'Add card failed',
			response: response,
			navigate: data.payload.navigate,
		});
		const card: FullCardData = yield response.json() as Promise<FullCardData>;
		card.name = '';
		toast.success('Card added succesfully');
		yield put(addCard(card));
	} catch (error) {
		toast.error('Card add failed');
	}
}

export function* handleAddColumn(data: ColumnData) {
	try {
		const response: Response = yield call(addColumnService, data.payload);
		yield checkAuthorizedStatus({
			message: 'Column create failed',
			response: response,
			navigate: data.payload.navigate,
		});

		const column: Column = yield response.json() as Promise<Column>;

		column.cards = [];
		toast.success('Column added succesfully');
		yield put(addColumn(column));
	} catch (error) {
		toast.error('Column add failed');
	}
}

export function* handleUpdateColumnName(data: ColumnData) {
	try {
		const response: Response = yield call(updateColumnNameService, data.payload);

		yield checkAuthorizedStatus({
			message: 'Column update failed',
			response,
			navigate: data.payload.navigate,
		});

		const column: Column = yield response.json() as Promise<Column>;
		toast.success('Column name updated succesfully');

		yield put(updateColumnName(column));
	} catch (error) {
		toast.error('Column name update failed');
	}
}

export function* handleUpdateCard(data: UpdateCardData) {
	try {
		const { columnId, navigate, ...rest } = data.payload;
		const response: Response = yield call(updateCardService, { ...rest });

		yield checkAuthorizedStatus({
			response,
			navigate,
			message: 'Card update failed',
		});

		const card: FullCardData = yield response.json() as Promise<FullCardData>;
		toast.success('Card updated succesfully');

		yield put(updateCardSuccess(card));
	} catch (error) {
		toast.error('Card update failed');
	}
}
export function* handleResetData() {
	try {
		yield put(resetData());
	} catch (error) {
		console.log(error);
	}
}
