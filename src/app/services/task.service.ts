import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {Task} from "../models/task"
import {DUMMY_TASKS} from "../shared/dummy-data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {}

  // Holds the list of all tasks in-memory.
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  // For demo/testing, initialize with DUMMY_TASKS instead of empty array.
  // private tasksSubject = new BehaviorSubject<Task[]>(DUMMY_TASKS);

  // Controls current sort mode (by priority or date).
  private sortBySubject = new BehaviorSubject<'priority' | 'date'>('priority');
  // Maps priority to sorting weight: High (1), Medium (2), Low (3).
  private priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
  // Tracks latest used task ID to assign unique IDs to new tasks.
  private idCounter = this.tasksSubject.value.length
    ? Math.max(...this.tasksSubject.value.map(t => t.id)) + 1
    : 1;

  // Emits a sorted, filtered list of non-archived tasks whenever the task list or sort mode changes.
  public readonly sortedTasks$: Observable<Task[]> = combineLatest([
    this.tasksSubject.asObservable(),
    this.sortBySubject.asObservable()
  ]).pipe(
    map(([tasks, sortBy]) => {
      // Only include non-archived tasks in main list view (per PDF requirement).
      const filtered = tasks.filter(t => !t.archived);
      if (sortBy === 'priority') {
        // Sort by priority (High > Medium > Low), then by createdAt (desc).
        return [...filtered].sort((a, b) => {
          const diff = this.priorityOrder[a.priority] - this.priorityOrder[b.priority];
          if (diff !== 0) return diff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      } else {
        // Sort by createdAt date (most recent first).
        return [...filtered].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    })
  );

  // Observable of all tasks (including archived).
  get tasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Get or set the current sort mode.
  get sortBy(): 'priority' | 'date' {
    return this.sortBySubject.value;
  }
  set sortBy(val: 'priority' | 'date') {
    this.sortBySubject.next(val);
  }

  // Add a new task to the list, assigning unique ID and creation date.
  addTask(task: Task) {
    task.id = this.idCounter++;
    task.createdAt = new Date();
    this.tasksSubject.next([...this.tasksSubject.value, task]);
  }

  // Update a task in the list by ID.
  updateTask(updated: Task) {
    this.tasksSubject.next(
      this.tasksSubject.value.map(t => t.id === updated.id ? updated : t)
    );
  }

  // Remove a task by ID.
  deleteTask(id: number) {
    this.tasksSubject.next(this.tasksSubject.value.filter(t => t.id !== id));
  }

  // Helper to find a task by its ID.
  private findById(id: number): Task {
    return this.tasksSubject.value.find(t => t.id === id)!;
  }

  // Emits only archived tasks for the archive view.
  getArchivedTasks(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.archived))
    );
  }

  // Archive a task (only if not already archived); set status to 'Done'.
  archiveTask(id: number) {
    const task = this.findById(id);
    if (task && !task.archived) {
      this.updateTask({ ...task, archived: true, status: 'Done' });
    }
  }

  // Restore an archived task; set status to 'Done' (PDF does not require restoring original status).
  restoreTask(id: number) {
    const task = this.findById(id);
    if (task && task.archived) {
      this.updateTask({
        ...task,
        archived: false,
        status: 'Done'
      });
    }
  }

}
