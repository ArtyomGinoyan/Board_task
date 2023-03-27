import { FullCardData } from './cardTypes';

export interface FullBoardData {
	id: number;
	title: string;
	cards: FullCardData[];
}
