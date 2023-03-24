export interface ColumnData {
  type: string;
  payload: {
    title: string;
    id?: number;
  };
}
export interface Column {
  id: number;
  title: string;
  cards?: [];
}
