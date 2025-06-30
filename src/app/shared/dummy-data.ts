import { Task } from '../models/task'
export const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    title: 'Prepare Report',
    description: 'Compile findings and recommendations.',
    status: 'To Do',
    dueDate: '2025-07-01', // ISO string for future date
    category: 'Work',
    tags: ['Leanne Graham', 'Ervin Howell'],
    priority: 'High',
    archived: false,
    createdAt: new Date('2025-06-25')
  },
  {
    id: 2,
    title: 'Buy Groceries',
    description: 'Milk, eggs, and bread.',
    status: 'In Progress',
    dueDate: '2025-06-26', // ISO string for overdue
    category: 'Personal',
    tags: ['Kurtis Weissnat'],
    priority: 'Low',
    archived: false,
    createdAt: new Date('2025-06-20')
  },
  {
    id: 3,
    title: 'Call Electrician',
    description: 'Fix living room lights.',
    status: 'Done',
    dueDate: '2025-06-29', // ISO string for today
    category: 'Urgent',
    tags: [],
    priority: 'Medium',
    archived: false,
    createdAt: new Date('2025-06-22')
  }
];
