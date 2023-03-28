const uploadFileService = async (file: { data: FormData; id: number }): Promise<Response> => {
	const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}/upload/${file.id}`, {
		method: 'POST',
		credentials: 'include',
		headers: {},
		body: file.data,
	});
	return response;
};

export default uploadFileService;
