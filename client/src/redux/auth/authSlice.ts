import { createSlice } from '@reduxjs/toolkit';
const localUser = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
	user: localUser || {},
	auth: !!localUser,
	message: {},
};

const authSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		loginAction: (state, action) => {},
		loginSuccesed: (state, action) => {
			state.user = action.payload;
			state.auth = true;
		},
		loginFailed: (state, action) => {
			state.message = action.payload;
		},
		logoutAction: (state, action) => {},
		logoutSuccesed: (state) => {
			state.auth = false;
		},
		refreshAction: () => {},
		updateProfileAction: (state, action) => {},
		updateProfileSuccess: (state, action) => {
			state.user = action.payload;
		},
		userReset: (state) => {
			state.user = localUser || {};
			state.auth = false;
		},
	},
});

export const {
	loginAction,
	loginFailed,
	logoutAction,
	loginSuccesed,
	logoutSuccesed,
	refreshAction,
	userReset,
	updateProfileAction,
	updateProfileSuccess,
} = authSlice.actions;

export default authSlice;
