import { createSlice } from '@reduxjs/toolkit';
import { FilesData } from './attachFilesSaga';

const initialState = {
	files: [] as FilesData[],
};

const cardFilesSlice = createSlice({
	name: 'files',
	initialState: initialState,
	reducers: {
		getFilesAction(state, action) {},
		getFilesSuccess(state, action) {
			state.files = action.payload;
		},
		getFilesFailed(state, action) {},
		resetFilesDataAction() {},
		resetFilesData(state) {
			state.files = [];
		},
		deleteFileAction(state, action) {},
		deleteFileSuccess(state, action) {
			// state.files.
		},
		uploadFileAction(state, action) {},
	},
});

export const {
	getFilesAction,
	getFilesFailed,
	getFilesSuccess,
	resetFilesData,
	resetFilesDataAction,
	deleteFileAction,
	deleteFileSuccess,
	uploadFileAction,
} = cardFilesSlice.actions;
export default cardFilesSlice;
