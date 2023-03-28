import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router';

import { deleteFileSuccess, getFilesAction, getFilesSuccess, resetFilesData } from './attachFilesSlice';
import { checkAuthorizedStatus } from '../auth/authSaga';

import { authState } from '../../types/authTypes';

import getFilesDataService from '../../services/getFilesDataService';
import deleteFileService from '../../services/deleteFileService';
import uploadFileService from '../../services/uploadFileService';

export interface filesData {
	type: string;
	payload: {
		id: number;
		navigate: NavigateFunction;
	};
}

export interface FilesData {
	id: number;
	file_name: string;
	cardId: number;
}

export interface download {
	type: string;
	payload: {
		file: FilesData;
		navigate: NavigateFunction;
	};
}
export interface upload {
	type: string;
	payload: {
		id: number;
		file: FormData;
		navigate: NavigateFunction;
	};
}

export function* handleFilesData(data: filesData) {
	try {
		console.log(data.payload);

		const response: Response = yield call(getFilesDataService, data.payload.id);
		yield checkAuthorizedStatus({
			message: 'Files data get failed',
			response: response,
			navigate: data.payload.navigate,
		});
		const filesData: FilesData[] = yield response.json() as Promise<FilesData[]>;
		console.log(filesData);

		toast.success('Get files data success');
		yield put(getFilesSuccess(filesData));
	} catch (error) {
		toast.error('Get files data failed');
	}
}

export function* handleDeleteFile(data: download) {
	try {
		console.log(data.payload);

		yield call(deleteFileService, data.payload.file);
		// yield checkAuthorizedStatus({
		// 	message: 'Files data get failed',
		// 	response: response,
		// 	navigate: data.payload.navigate,
		// });
		yield put(getFilesAction({ id: data.payload.file.cardId, navigate: data.payload.navigate }));
		// yield put(deleteFileSuccess(data.payload.file))
		// const filesData: FilesData[] = yield response.json() as Promise<FilesData[]>;
		toast.success('Delete file success');
		// yield put(getFilesSuccess(filesData));
	} catch (error) {
		toast.error('Delete file  failed');
	}
}

export function* handleUploadFile(data: upload) {
	try {
		console.log(data.payload);

		yield call(uploadFileService, { data: data.payload.file, id: data.payload.id });
		// yield checkAuthorizedStatus({
		// 	message: 'Files data get failed',
		// 	response: response,
		// 	navigate: data.payload.navigate,
		// });
		yield put(getFilesAction({ id: data.payload.id, navigate: data.payload.navigate }));

		toast.success('Upload file success');
		// yield put(getFilesSuccess(filesData));
	} catch (error) {
		toast.error('Upload file failed');
	}
}

export function* handleResetFilesData() {
	try {
		yield put(resetFilesData());
	} catch (error) {
		console.log(error);
	}
}
