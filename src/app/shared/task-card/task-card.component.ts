import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit{
  @Input() task!: Task;
  @Input() index!: number;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  archiveTask(task: Task) {
    this.taskService.archiveTask(task.id);
  }

  restoreTask(task: Task) {
    this.taskService.restoreTask(task.id);
    // ngOnInit subscription will auto-update the list if TaskService emits new values
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
