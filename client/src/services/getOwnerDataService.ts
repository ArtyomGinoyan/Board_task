const getOwnerDataService = async (id: number): Promise<Response> => {
	const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/card/owner/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};
export default getOwnerDataService;
