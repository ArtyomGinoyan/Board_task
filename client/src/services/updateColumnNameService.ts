const updateColumnNameService = async (form: { title: string; id?: number }): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/column/update/${form.id}`, {
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

export default updateColumnNameService;
