import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import {TaskFormComponent} from "../../shared/task-form/task-form.component";
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks =>
      this.tasks = tasks.filter(t => !t.archived)
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

  editTask(task: Task) {
    // Implement: open dialog in edit mode or navigate to /task/:id
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  archiveTask(task: Task) {
    this.taskService.archiveTask(task.id);
  }

  goToTaskDetail(task: Task) {
    this.router.navigate(['/task', task.id]);
  }

  priorityClass(priority: 'High' | 'Medium' | 'Low'): string {
    switch (priority) {
      case 'High': return 'chip-high';
      case 'Medium': return 'chip-medium';
      case 'Low': return 'chip-low';
      default: return '';
    }
  }
}
