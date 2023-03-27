const getDataService = async (): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/board/data`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};

export default getDataService;
