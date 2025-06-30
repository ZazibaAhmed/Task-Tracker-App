export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskCategory = 'Work' | 'Personal' | 'Urgent' | 'Other';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string; // ISO string
  category: TaskCategory;
  tags?: string[];
  archived: boolean;
  createdAt: Date;
  priority: Priority;
}
