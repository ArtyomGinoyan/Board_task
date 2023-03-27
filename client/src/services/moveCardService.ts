import { moveCardForService } from '../types/cardTypes';

const moveCardService = async (form: moveCardForService): Promise<Response> => {
	const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/card/moved`, {
		method: 'PUT',
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

export default moveCardService;
