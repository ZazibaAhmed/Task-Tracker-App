import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {Task, TaskStatus} from "../models/task"
import {DUMMY_TASKS} from "../shared/dummy-data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {}

  // private tasksSubject = new BehaviorSubject<Task[]>([]); // FIX
  private tasksSubject = new BehaviorSubject<Task[]>(DUMMY_TASKS);
  private sortBySubject = new BehaviorSubject<'priority' | 'date'>('priority');
  private priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
  private idCounter = this.tasksSubject.value.length
    ? Math.max(...this.tasksSubject.value.map(t => t.id)) + 1
    : 1;

  // Observable of only non-archived, sorted tasks
  public readonly sortedTasks$: Observable<Task[]> = combineLatest([
    this.tasksSubject.asObservable(),
    this.sortBySubject.asObservable()
  ]).pipe(
    map(([tasks, sortBy]) => {
      const filtered = tasks.filter(t => !t.archived);
      if (sortBy === 'priority') {
        return [...filtered].sort((a, b) => {
          const diff = this.priorityOrder[a.priority] - this.priorityOrder[b.priority];
          if (diff !== 0) return diff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      } else {
        return [...filtered].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    })
  );

  get tasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  get sortBy(): 'priority' | 'date' {
    return this.sortBySubject.value;
  }
  set sortBy(val: 'priority' | 'date') {
    this.sortBySubject.next(val);
  }

  addTask(task: Task) {
    task.id = this.idCounter++;
    task.createdAt = new Date();
    this.tasksSubject.next([...this.tasksSubject.value, task]);
  }

  updateTask(updated: Task) {
    this.tasksSubject.next(
      this.tasksSubject.value.map(t => t.id === updated.id ? updated : t)
    );
  }

  deleteTask(id: number) {
    this.tasksSubject.next(this.tasksSubject.value.filter(t => t.id !== id));
  }

  private findById(id: number): Task {
    return this.tasksSubject.value.find(t => t.id === id)!;
  }

  getArchivedTasks(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.archived))
    );
  }

  archiveTask(id: number) {
    const task = this.findById(id);
    if (task && !task.archived) {
      this.updateTask({ ...task, archived: true, status: 'Done' });
    }
  }

  // Restore Done status
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
