const updateCardService = async (form: { name: string; id?: number; content: string }): Promise<Response> => {
	const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/card/update/${form.id}`, {
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

export default updateCardService;
