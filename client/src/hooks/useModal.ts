import { useOutletContext } from 'react-router';
import { FullCardData } from '../types/cardTypes';

export interface ContextType {
	openModal: (data: FullCardData | null, source: string) => void;
	isOpen: boolean;
}

export function useModal() {
	return useOutletContext<ContextType>();
}
