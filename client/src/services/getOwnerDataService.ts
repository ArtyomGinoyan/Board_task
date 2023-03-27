const getOwnerDataService = async (id: number): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/card/owner/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};
export default getOwnerDataService;
