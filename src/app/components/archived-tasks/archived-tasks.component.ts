import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task";

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.scss']
})
export class ArchivedTasksComponent implements OnInit{
  archivedTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadArchivedTasks();
  }

  loadArchivedTasks() {
    this.taskService.getArchivedTasks().subscribe(tasks => {
      this.archivedTasks = tasks;
    });
  }
}
