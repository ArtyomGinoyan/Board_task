import { IUser } from '../types/authTypes';

const updateProfileService = async (form: IUser): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/profile/update/${form.id}`, {
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
