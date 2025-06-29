import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskCategory, TaskStatus } from '../../models/task';
import {dueDateValidator} from "../../validators/due-date.validator";
import {TagService} from "../../services/tag.service";
import {tagsArrayValidator} from "../../validators/tags.validator";
import {Subscription} from "rxjs";

export interface TaskFormData {
  task?: Task;
  isEdit?: boolean;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;
  categories: TaskCategory[] = ['Work', 'Personal', 'Urgent', 'Other'];
  statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  isEdit = false;
  availableTags: string[] = [];
  tagsLoadFailed = false;
  tagsInput = new FormControl('');
  private statusSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormData,
    private tagService: TagService,
  ) {}

  ngOnInit() {
    this.isEdit = !!this.data?.isEdit;
    this.initializeTaskForm();
    this.loadTags();
    this.formControlDisableHandler();
  }

  initializeTaskForm(){
    const t = this.data?.task;
    // Prepare FormArray for tags, either empty or with existing tags (for edit)
    const tagControls = (t?.tags || []).map(tag => this.createTagControl(tag));

    this.taskForm = this.fb.group({
      title: [t?.title || '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [t?.description || '', [Validators.maxLength(200)]],
      status: [t?.status || 'To Do', Validators.required],
      dueDate: [t?.dueDate || '', dueDateValidator()],
      category: [t?.category || '', Validators.required],
      tags: this.fb.array(tagControls, tagsArrayValidator),
      priority: [t?.priority || 'Medium'], // Default is 'Medium'
    });
  }

  loadTags(){
    this.tagService.getTags().subscribe(tags => {
      if (tags) {
        console.log(tags);
        this.availableTags = tags;
      } else {
        this.tagsLoadFailed = true;
      }
    });
  }

  formControlDisableHandler(){
    // Set initial disabled/enabled state after building the form
    this.disableCompletedFieldsIfNeeded();

    // Subscribe to changes of the status field
    this.statusSub = this.taskForm.get('status')?.valueChanges.subscribe(() => {
      this.disableCompletedFieldsIfNeeded();
    });
  }

  disableCompletedFieldsIfNeeded() {
    const isDone = this.isEdit && this.taskForm.get('status')?.value === 'Done';
    // These form controls (except status) get toggled
    const controlsToToggle = ['title', 'description', 'dueDate', 'category', 'tags', 'priority'];

    controlsToToggle.forEach(field => {
      const control = this.taskForm.get(field);
      if (!control) return;

      if (isDone) {
        control.disable({ emitEvent: false });
        // For tags FormArray, also disable all child controls (each tag)
        if (this.tagsInput) {
          this.tagsInput.disable({ emitEvent: false })
        }
      } else {
        control.enable({ emitEvent: false });
        if (this.tagsInput) {
          this.tagsInput.enable({ emitEvent: false });
        }
      }
    });
  }

  get isReadOnly() {
    return this.isEdit && this.taskForm.get('status')?.value === 'Done';
  }

  get tagsFormArray(): FormArray {
    return this.taskForm.get('tags') as FormArray;
  }

  createTagControl(tag: string): FormControl {
    return new FormControl(tag, [
      Validators.minLength(2),
      Validators.maxLength(20)
    ]);
  }

  addTagFromInput(event: any) {
    const input = event.input;
    const value = event.value?.trim();

    if (value && !this.tagsFormArray.value.includes(value)) {
      this.tagsFormArray.push(this.createTagControl(value));
    }
    this.tagsFormArray.markAsTouched();
    this.tagsFormArray.updateValueAndValidity();

    if (input) input.value = '';
    this.tagsInput.setValue('');
  }

  selectTag(event: any) {
    const value = event.option.value;
    if (value && !this.tagsFormArray.value.includes(value)) {
      this.tagsFormArray.push(this.createTagControl(value));
    }
    this.tagsFormArray.markAsTouched();
    this.tagsFormArray.updateValueAndValidity();
    this.tagsInput.setValue('');
  }

  removeTag(index: number) {
    this.tagsFormArray.removeAt(index);
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

  ngOnDestroy() {
    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }
  }
}
