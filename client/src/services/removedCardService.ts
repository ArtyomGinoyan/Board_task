import { RemoveCard } from '../types/cardTypes';

const removeCardService = async (form: RemoveCard): Promise<Response> => {
	const response = await fetch(`${process.env.SERVER_HOST}/${form.id}/${form.position}/${form.columnId}`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};

export default removeCardService;
