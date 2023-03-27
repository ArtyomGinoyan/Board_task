import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { call, put, select } from 'redux-saga/effects';

import { userSelector } from './authSelector';

import { AuthData, IUser, UpdateData } from '../../types/authTypes';
import { logout, signIn } from '../../services/authService';
import updateProfileService from '../../services/updateProfileService';
import {
	loginFailed,
	loginSuccesed,
	logoutAction,
	logoutSuccesed,
	updateProfileSuccess,
	userReset,
} from './authSlice';
import { resetOwnerData } from '../cardOwner/cardOwnerSlice';
import { resetData } from '../board/boardSlice';

export interface DataNavigate {
	type: string;
	payload: NavigateFunction;
}
export interface CheckStatus {
	message: string;
	response: Response;
	navigate: NavigateFunction;
}

export function* logoutUser(data: DataNavigate) {
	try {
		const user: IUser = yield select(userSelector);
		yield call(logout, user.id);
		yield put(logoutSuccesed());
		yield data.payload('login');
		yield localStorage.removeItem('user');
		yield resetStore();
	} catch (error) {
		console.log(error);
	}
}

export function* resetStore() {
	yield put(userReset());
	yield put(resetData());
	yield put(resetOwnerData());
}

export function* auth(data: AuthData) {
	try {
		const response: Response = yield call(signIn, data.payload);

		if (!response.ok) {
			throw new Error('Login failed');
		}
		const user: IUser = yield response.json() as Promise<IUser>;

		yield localStorage.setItem('user', JSON.stringify(user));
		yield put(loginSuccesed(user));
	} catch (error: any) {
		yield put(loginFailed(error.message));
	}
}
export function* checkAuthorizedStatus(data: CheckStatus) {
	if (!data.response.ok) {
		if (data.response.statusText === 'Unauthorized') {
			toast.error('Sorry,You are Unauthorized');
			yield put(logoutAction(data.navigate));
			throw new Error(data.response.statusText);
		}
		throw new Error(data.message);
	}
}

export function* updateProfile(data: UpdateData) {
	try {
		const response: Response = yield call(updateProfileService, data.payload);
		yield checkAuthorizedStatus({
			response,
			navigate: data.payload.navigate,
			message: 'user update failed',
		});
		const user: IUser = yield response.json() as Promise<IUser>;
		yield localStorage.setItem('user', JSON.stringify(user));
		toast.success('Update profile success');
		yield put(updateProfileSuccess(user));
	} catch (error: any) {
		toast.error('Update profile failed');
		console.log(error);
	}
}
