export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  photoUrl?: string;
  tags?: string[];
}
