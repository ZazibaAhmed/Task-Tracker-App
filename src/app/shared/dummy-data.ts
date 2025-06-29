import { Task } from '../models/task'
export const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    title: 'Finish Angular Assessment',
    description: 'Complete all tasks in the Angular internship assessment and push to GitHub.',
    status: 'In Progress',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 2 days from now
    category: 'Work',
    tags: ['Leanne Graham', 'CustomTag'],
    archived: false,
    createdAt: new Date('2024-06-25T10:00:00'),
    priority: 'High'
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, fruits, and vegetables.',
    status: 'To Do',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 5 days from now
    category: 'Personal',
    tags: ['Ervin Howell'],
    archived: false,
    createdAt: new Date('2024-06-27T14:20:00'),
    priority: 'Low'
  },
  {
    id: 3,
    title: 'Project Meeting',
    description: 'Sync-up with team regarding project milestones.',
    status: 'Done',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 1 day ago
    category: 'Work',
    tags: ['Clementine Bauch'],
    archived: true,
    createdAt: new Date('2024-06-22T09:30:00'),
    priority: 'Medium'
  },
  {
    id: 4,
    title: 'Doctor Appointment',
    description: 'Routine check-up appointment at 3:00 PM.',
    status: 'To Do',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // tomorrow
    category: 'Personal',
    tags: ['Patricia Lebsack'],
    archived: false,
    createdAt: new Date('2024-06-28T08:00:00'),
    priority: 'Medium'
  },
  {
    id: 5,
    title: 'Fix urgent bug',
    description: 'Critical bug affecting the login flow needs immediate attention.',
    status: 'In Progress',
    dueDate: new Date().toISOString().slice(0, 10), // today
    category: 'Urgent',
    tags: [],
    archived: false,
    createdAt: new Date('2024-06-28T07:45:00'),
    priority: 'High'
  },
  {
    id: 6,
    title: 'Read Angular Material docs',
    description: 'Study the Angular Material documentation for future projects.',
    status: 'Done',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 3 days ago
    category: 'Other',
    tags: ['Chelsey Dietrich'],
    archived: true,
    createdAt: new Date('2024-06-20T17:15:00'),
    priority: 'Low'
  },
  {
    id: 7,
    title: 'Call plumber',
    description: 'Leaking sink needs to be fixed.',
    status: 'To Do',
    dueDate: undefined,
    category: 'Personal',
    tags: ['Mrs. Dennis Schulist'],
    archived: false,
    createdAt: new Date('2024-06-27T16:00:00'),
    priority: 'Medium'
  }
];

