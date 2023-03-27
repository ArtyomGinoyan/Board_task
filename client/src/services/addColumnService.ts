const addColumnService = async (form: { title: string }): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/column/create`, {
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
