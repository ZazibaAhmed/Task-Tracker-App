import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from "../models/task"
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

  archiveTask(id: number) {
    this.updateTask({ ...this.findById(id), status: 'Done', archived: true });
  }

  private findById(id: number): Task {
    return this.tasksSubject.value.find(t => t.id === id)!;
  }

  // ... Add restoreArchived and more as needed ...

}
