import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskDetailsComponent} from "./components/task-details/task-details.component";
import {ArchivedTasksComponent} from "./components/archived-tasks/archived-tasks.component";

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
  { path: 'archive', component: ArchivedTasksComponent },
  { path: '**', redirectTo: '/tasks' }, // fallback for invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
