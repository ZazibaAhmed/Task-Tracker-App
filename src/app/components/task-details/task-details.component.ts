import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {Task} from "../../models/task";
import {TaskFormComponent} from "../../shared/task-form/task-form.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.tasks$.subscribe(tasks => {
      this.task = tasks.find(t => t.id === id);
    });
  }

  openEditDialog() {
    if (!this.task) return;
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: { task: this.task, isEdit: true }
    });
    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        this.taskService.updateTask(result);
        this.task = result;
      }
    });
  }

}
