import { NavigateFunction } from 'react-router';

export interface ColumnData {
	type: string;
	payload: {
		title: string;
		id?: number;
		navigate: NavigateFunction;
	};
}
export interface Column {
	id: number;
	title: string;
	cards?: [];
}
