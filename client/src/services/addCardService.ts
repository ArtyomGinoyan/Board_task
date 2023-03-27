import { Card } from '../types/cardTypes';

const addCardService = async (form: Card): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/card/create`, {
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

export default addCardService;
