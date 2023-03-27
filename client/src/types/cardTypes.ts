import { NavigateFunction } from 'react-router';

export interface FullCardData {
	id: number;
	name: string;
	content: string;
	position: number;
	columnId: number;
	userId: number;
}

export interface UpdateCard {
	navigate: NavigateFunction;
	name: string;
	content: string;
	id: number;
	columnId: string;
}

export interface RemoveCard {
	id: number;
	position: number;
	columnId: number;
	userId: number;
}

export interface Card {
	columnId: number;
	userId: number;
	content: string;
	position: number;
	navigate: NavigateFunction;
}

export interface MovedData {
	source: {
		index: number;
		droppableId: string;
	};
	destination: {
		index: number;
		droppableId: string;
	};
	cardId: string;
	navigate: NavigateFunction;
}

export interface moveCardForService {
	id: string;
	source: {
		index: number;
		droppableId: string;
	};
	destination: {
		index: number;
		droppableId: string;
	};
	newPosition: number;
}
