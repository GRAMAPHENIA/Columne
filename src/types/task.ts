export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  columnId: ColumnType;
  photoUrl?: string;
}

export type ColumnType = 'Pendiente' | 'En Progreso' | 'Finalizado';

export const columns: ColumnType[] = ['Pendiente', 'En Progreso', 'Finalizado'];

