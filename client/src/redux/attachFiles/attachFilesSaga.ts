import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router';

import { checkAuthorizedStatus } from '../auth/authSaga';
import { getFilesAction, getFilesSuccess, resetFilesData } from './attachFilesSlice';

import deleteFileService from '../../services/deleteFileService';
import uploadFileService from '../../services/uploadFileService';
import getFilesDataService from '../../services/getFilesDataService';
import { Message } from '../../types/authTypes';

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

export function* handleGetFilesData(data: filesData) {
	try {
		const response: Response = yield call(getFilesDataService, data.payload.id);
		yield checkAuthorizedStatus({
			message: 'Attached files get failed',
			response: response,
			navigate: data.payload.navigate,
		});
		const filesData: FilesData[] = yield response.json() as Promise<FilesData[]>;

		yield put(getFilesSuccess(filesData));
	} catch (error) {
		toast.error('Attached Files  get failed');
	}
}

export function* handleDeleteFile(data: download) {
	try {
		yield call(deleteFileService, data.payload.file);
		yield checkAuthorizedStatus({
			message: 'Attached file delete failed',
			response: null,
			navigate: data.payload.navigate,
		});
		yield put(getFilesAction({ id: data.payload.file.cardId, navigate: data.payload.navigate }));
		toast.success('Delete attacheed file success');
	} catch (error) {
		toast.error('Delete attached file failed');
	}
}

export function* handleUploadFile(data: upload) {
	try {
		const response: Response = yield call(uploadFileService, {
			data: data.payload.file,
			id: data.payload.id,
		});
		const { message }: Message = yield response.json() as Promise<Message>;
		yield checkAuthorizedStatus({
			message: message,
			response: response,
			navigate: data.payload.navigate,
		});
		yield put(getFilesAction({ id: data.payload.id, navigate: data.payload.navigate }));
		toast.success(message);
	} catch (error: any) {
		toast.error(error.message);
	}
}

export function* handleResetFilesData() {
	try {
		yield put(resetFilesData());
	} catch (error) {
		console.log(error);
	}
}
