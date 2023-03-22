export interface authState {
  name?: string;
  surname?: string;
  email: string;
  password?: string;
}

export interface IUser extends authState {
  id: number;
  roles: string;
}

export interface AuthData {
  type: string;
  payload: authState;
}
