import { Task } from '../models/task'

export const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    title: 'Prepare project report',
    description: 'Summarize all results and prepare the final report for the client.',
    status: 'In Progress',
    dueDate: '2025-07-05',
    category: 'Work',
    tags: ['Leanne Graham', 'Ervin Howell'],
    archived: false,
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, and vegetables.',
    status: 'Done',
    dueDate: '2025-07-01',
    category: 'Personal',
    tags: ['Clementine Bauch'],
    archived: false,
  },
  {
    id: 3,
    title: 'Renew car insurance',
    description: '',
    status: 'To Do',
    dueDate: '2025-06-20',
    category: 'Urgent',
    tags: ['Patricia Lebsack'],
    archived: false,
  },
  {
    id: 4,
    title: 'Read Angular docs',
    description: 'Review Angular forms and custom directives sections.',
    status: 'Done',
    dueDate: '2025-06-15',
    category: 'Work',
    tags: [],
    archived: true,
  },
  {
    id: 5,
    title: 'Doctor appointment',
    description: 'Annual check-up at 10am.',
    status: 'To Do',
    dueDate: '',
    category: 'Personal',
    tags: [],
    archived: false,
  }
];
