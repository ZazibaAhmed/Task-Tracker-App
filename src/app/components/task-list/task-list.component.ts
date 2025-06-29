import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import {TaskFormComponent} from "../../shared/task-form/task-form.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    // this.taskService.tasks$.subscribe(tasks =>
    //   this.tasks = tasks.filter(t => !t.archived)
    // );
    this.taskService.sortedTasks$.subscribe(tasks =>
      this.tasks = tasks
    );
    console.log(this.tasks);
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { isEdit: false }
    });
    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.taskService.addTask(result);
      }
    });
  }

  get sortBy() {
    return this.taskService.sortBy;
  }

  onSortChange(value: 'priority' | 'date') {
    this.taskService.sortBy = value;
  }

}
