import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskCategory, TaskStatus } from '../../models/task';
import {dueDateValidator} from "../../validators/due-date.validator";

export interface TaskFormData {
  task?: Task;
  isEdit?: boolean;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  categories: TaskCategory[] = ['Work', 'Personal', 'Urgent', 'Other'];
  statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormData
  ) {}

  ngOnInit() {
    this.isEdit = !!this.data?.isEdit;
    this.initializeTaskForm();

  }

  initializeTaskForm(){
    const t = this.data?.task;

    this.taskForm = this.fb.group({
      title: [t?.title || '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [t?.description || '', [Validators.maxLength(200)]],
      status: [t?.status || 'To Do', Validators.required],
      dueDate: [t?.dueDate || '', dueDateValidator()],
      category: [t?.category || '', Validators.required],
      tags: [t?.tags || []]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const result: Task = {
        ...(this.data?.task || {}),
        ...this.taskForm.value,
        archived: this.data?.task?.archived || false
      };
      this.dialogRef.close(result);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
