import { IUser } from '../types/authTypes';

const updateProfileService = async (form: IUser): Promise<Response> => {
	const response = await fetch(`${process.env.SERVER_HOST}/profile/update/${form.id}`, {
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
export default updateProfileService;
