import { call, put } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router';

import { getOwnerSuccess, resetOwnerData } from './cardOwnerSlice';
import { checkAuthorizedStatus } from '../auth/authSaga';

import { authState } from '../../types/authTypes';

import getOwnerDataService from '../../services/getOwnerDataService';
import { toast } from 'react-toastify';

export interface ownerData {
	type: string;
	payload: {
		id: number;
		navigate: NavigateFunction;
	};
}

export function* handleOwnerData(data: ownerData) {
	try {
		const response: Response = yield call(getOwnerDataService, data.payload.id);
		yield checkAuthorizedStatus({
			message: 'Owner data get failed',
			response: response,
			navigate: data.payload.navigate,
		});
		const ownerData: authState = yield response.json() as Promise<authState>;
		toast.success('Get owner data success');
		yield put(getOwnerSuccess(ownerData));
	} catch (error) {
		toast.error('Get owner data failed');
	}
}

export function* handleResetOwnerData() {
	try {
		yield put(resetOwnerData());
	} catch (error) {
		console.log(error);
	}
}
