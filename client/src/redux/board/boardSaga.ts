import { call, put } from "redux-saga/effects";
import addCardService from "../../services/addCardService";
import getDataService from "../../services/getDataService";
import moveCardService from "../../services/moveCardService";
import addColumnService from "../../services/addColumnService";
import updateColumnNameService from "../../services/updateColumnNameService";
import { el } from "../../pages/board/Board";
import { Column, ColumnData } from "../../types/columnTypes";
import { Card, FullCardData, MovedData, RemoveCard } from "../../types/cardTypes";
import {
  addCard,
  addColumn,
  getDataSuccess,
  moveCard,
  removeCard,
  updateColumnName,
} from "./boardSlice";
import removeCardService from "../../services/removedCardService";

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
    payload: FullCardData;
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

export function* handleRemoveCard(data: RemovedData) {
    try {
      console.log(data);
      yield put(removeCard(data.payload));
      yield call(removeCardService, {
        id: data.payload.id,
        columnId: data.payload.columnId,
        position: data.payload.position,
        userId: data.payload.userId
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
    console.log(column);

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
