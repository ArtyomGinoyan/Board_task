const getDataService = async (): Promise<Response> => {
	const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/board/data`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};

export default getDataService;
