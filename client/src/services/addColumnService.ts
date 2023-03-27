const addColumnService = async (form: { title: string }): Promise<Response> => {
	const response = await fetch(`${process.env.SERVER_HOST}/column/create`, {
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

export default addColumnService;
