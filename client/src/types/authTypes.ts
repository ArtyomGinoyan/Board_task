import { NavigateFunction } from 'react-router';

export interface authState {
	name?: string;
	email: string;
	password?: string;
  admin?: boolean;
}

export interface IUser extends authState {
	id: number;
	roles: string;
	newPassword?: string;
	oldPassword?: string;
}
export interface UpdateUser extends authState {
	id: number;
	roles: string;
	newPassword?: string;
	oldPassword?: string;
	navigate: NavigateFunction;
}
export interface UpdateData {
	type: string;
	payload: UpdateUser;
}

export interface AuthData {
	type: string;
	payload: IUser | UpdateUser;
}
