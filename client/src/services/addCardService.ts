import { Card } from '../types/cardTypes';

const addCardService = async (form: Card): Promise<Response> => {
	const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/card/create`, {
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
