import { NavigateFunction } from 'react-router-dom';
import { call, put } from 'redux-saga/effects';
import { signIn } from '../../services/authService';
import { AuthData, IUser } from '../../types/authTypes';
import { loginFailed, loginSuccesed } from './authSlice';


interface Data {
	type: string;
	payload: NavigateFunction;
}

export function* logoutUser(data: Data) {
	// yield call(logout);
	// yield put(logoutSuccesed());
	yield data.payload('login');
	yield localStorage.removeItem('user');
	yield resetStore();
}

export function* resetStore() {
	// yield put(userReset());
	// yield put(courseReset());
	// yield put(studentReset());
	// yield put(trainerReset());
	// yield put(subjectReset());
}

export function* auth(data: AuthData) {
	try {
		console.log("kklllll",  data.payload);
		
		const response: Response = yield call(signIn, data.payload);

		if (!response.ok) {
			throw new Error('Login failed');
		}
		const user: IUser = yield response.json() as Promise<IUser>;
		console.log(user.roles);

		// yield put(getAllCoursesAction());
		yield localStorage.setItem('user', JSON.stringify(user));
		yield put(loginSuccesed(user));
	} catch (error: any) {
		// in typescript error can only be one of two types: "any" or "unknown"
		yield put(loginFailed(error.message));
	}
}