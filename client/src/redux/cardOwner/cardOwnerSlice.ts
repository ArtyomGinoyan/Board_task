import { createSlice } from '@reduxjs/toolkit';
import { authState } from '../../types/authTypes';

const initialState = {
	owner: {} as authState,
};

const cardOwnerSlice = createSlice({
	name: 'owner',
	initialState: initialState,
	reducers: {
		getOwnerAction(state, action) {},
		getOwnerSuccess(state, action) {
			state.owner = action.payload;
		},
		getOwnerFailed(state, action) {},
		resetOwnerDataAction() {},
		resetOwnerData(state) {
			state.owner = {} as authState;
		},
	},
});

export const { getOwnerAction, getOwnerFailed, getOwnerSuccess, resetOwnerData, resetOwnerDataAction } =
	cardOwnerSlice.actions;
export default cardOwnerSlice;
