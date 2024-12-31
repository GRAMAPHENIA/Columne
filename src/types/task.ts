export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  columnId: ColumnType;
  photoUrl?: string | null;
}

export type ColumnType = 'Pendiente' | 'Progreso' | 'Finalizado';

export const columns: ColumnType[] = ['Pendiente', 'Progreso', 'Finalizado'];

