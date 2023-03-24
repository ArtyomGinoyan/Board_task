import { call, put } from "redux-saga/effects";
import { el } from "../../pages/board/Board";
import addCardService from "../../services/addCardService";
import addColumnService from "../../services/addColumnService";
import getDataService from "../../services/getDataService";
import moveCardService from "../../services/moveCardService";
import updateColumnNameService from "../../services/updateColumnNameService";
import { Card, FullCardData, MovedData } from "../../types/cardTypes";
import { Column, ColumnData } from "../../types/columnTypes";
import {
  addCard,
  addColumn,
  getDataSuccess,
  moveCard,
  updateColumnName,
} from "./boardSlice";

export interface Data {
  type: string;
  payload: MovedData;
}

export interface CardData {
  type: string;
  payload: Card;
}

export function* handleMoveCard(data: Data) {
  try {
    console.log(data);
    yield put(moveCard(data.payload));
    yield call(moveCardService, {
      id: data.payload.cardId,
      source: data.payload.source,
      destination: data.payload.destination,
      newPosition: data.payload.destination.index,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* handleData() {
  try {
    const response: Response = yield call(getDataService);
    if (!response.ok) {
      throw new Error("Data get failed");
    }
    const data: el[] = yield response.json() as Promise<el[]>;
    console.log(data);

    yield put(getDataSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleAddCard(data: CardData) {
  try {
    const response: Response = yield call(addCardService, data.payload);
    if (!response.ok) {
      throw new Error("Card create failed");
    }
    const card: FullCardData = yield response.json() as Promise<FullCardData>;
    card.name = null;
    yield put(addCard(card));
    console.log(card);
  } catch (error) {
    console.log(error);
  }
}

export function* handleAddColumn(data: ColumnData) {
  try {
    const response: Response = yield call(addColumnService, data.payload);
    if (!response.ok) {
      throw new Error("Column create failed");
    }
    const column: Column = yield response.json() as Promise<Column>;
    column.cards = [];
    yield put(addColumn(column));
    console.log(column);
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateColumnName(data: ColumnData) {
  try {
    const response: Response = yield call(
      updateColumnNameService,
      data.payload,
    );
    if (!response.ok) {
      throw new Error("Column update failed");
    }
    const column: Column = yield response.json() as Promise<Column>;
    console.log(column);

    yield put(updateColumnName(column));
  } catch (error) {
    console.log(error);
  }
}
