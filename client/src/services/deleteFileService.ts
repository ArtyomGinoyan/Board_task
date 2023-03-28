import { FilesData } from '../redux/attachFiles/attachFilesSaga';

const deleteFileService = async (file: FilesData) => {
	const response = await fetch(
		`${process.env.REACT_APP_SERVER_HOST}/files/${file.file_name}/${file.cardId}/${file.id}`,
		{
			method: 'DELETE',
			credentials: 'include',
			// headers: {
			// 	'Content-Type': 'application/json',
			// },
		}
	);
	// return response;
};
export default deleteFileService;
