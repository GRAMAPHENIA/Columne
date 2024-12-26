export interface Task {
  date: string | number | Date;
  id: string;
  title: string;
  description: string;
  columnId: string;
  photoUrl?: string;
  tags?: string[];
}
