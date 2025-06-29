import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ArchivedTasksComponent } from './components/archived-tasks/archived-tasks.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskFormComponent } from './shared/task-form/task-form.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DueDateFormatPipe } from './pipes/due-date-format.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { OverdueHighlightDirective } from './directives/overdue-highlight.directive';
import { TaskCardComponent } from './shared/task-card/task-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailsComponent,
    ArchivedTasksComponent,
    NavbarComponent,
    TaskFormComponent,
    DueDateFormatPipe,
    TruncatePipe,
    OverdueHighlightDirective,
    TaskCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
