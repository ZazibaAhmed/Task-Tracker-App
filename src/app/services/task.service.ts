import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Task, TaskStatus} from "../models/task"
import {MatDialog} from "@angular/material/dialog";
import {DUMMY_TASKS} from "../shared/dummy-data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {}

  // private tasksSubject = new BehaviorSubject<Task[]>([]);
  private tasksSubject = new BehaviorSubject<Task[]>(DUMMY_TASKS);
  private idCounter = 1;
  private previousStatusMap = new Map<number, TaskStatus>();

  get tasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    task.id = this.idCounter++;
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

  // archiveTask: Save original status
  archiveTask(id: number) {
    const task = this.findById(id);
    if (task && !task.archived) {
      this.previousStatusMap.set(id, task.status); // store before archive
      this.updateTask({ ...task, archived: true, status: 'Done' });
    }
  }

  // restoreTask: Restore original status
  restoreTask(id: number) {
    const task = this.findById(id);
    const previousStatus = this.previousStatusMap.get(id);
    if (task && task.archived) {
      this.updateTask({
        ...task,
        archived: false,
        status: previousStatus && previousStatus !== 'Done' ? previousStatus : 'To Do'
      });
      this.previousStatusMap.delete(id); // Clean up
    }
  }


}
