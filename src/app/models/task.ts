export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskCategory = 'Work' | 'Personal' | 'Urgent' | 'Other';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string; // ISO string (or Date, but string is easier for JSON and Angular Material)
  category: TaskCategory;
  tags?: string[];
  archived: boolean;
  // For challenge: priority?: 'Low' | 'Medium' | 'High';
}
