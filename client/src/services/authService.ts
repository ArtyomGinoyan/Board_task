import { authState } from '../types/authTypes';

const signIn = async (form: authState): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...form,
		}),
	});
	return response;
};

const logout = async (id: number) => {
	await fetch(`http://localhost:3303/auth/logout/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

const signUp = async (form: authState): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/auth/signup`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...form,
		}),
	});
	return response;
};

export { signIn, logout, signUp };
