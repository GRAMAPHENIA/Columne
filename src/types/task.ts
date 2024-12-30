export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  columnId: ColumnType;
  photoUrl?: string | null;
}

export type ColumnType = 'Pendiente' | 'En Progreso' | 'Finalizado';

export const columns: ColumnType[] = ['Pendiente', 'En Progreso', 'Finalizado'];

