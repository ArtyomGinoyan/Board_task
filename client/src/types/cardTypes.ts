export interface FullCardData {
  id: number;
  name?: string | null;
  content: string;
  position: number;
  columnId: number;
  userId: number;
}

export interface RemoveCard {
    id: number;
    position: number;
    columnId: number;
    userId: number
}
export interface Card {
  columnId: number;
  userId: number;
  content: string;
  position: number;
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
