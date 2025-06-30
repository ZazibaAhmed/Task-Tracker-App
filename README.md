# Task Tracker App

A task management app built with Angular and Angular Material

## Features

- Add, edit, delete, archive, and restore tasks
- Tasks have: Title, Description, Status, Due Date, Category, Tags, Priority
- Sort by priority or creation date (toggle)
- Archive and restore tasks
- API integration for tag suggestions (JSONPlaceholder)
- Responsive, mobile-friendly UI (Angular Material)
- Custom validation and error messages

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Run `ng serve` and open [http://localhost:4200](http://localhost:4200)

## Folder Structure

- `/components` – UI components (task-list, task-details, archived-tasks, etc)
- `/services` – Data and API services (`TaskService`, `TagService`)
- `/models` – TypeScript interfaces and enums (`Task`)
- `/pipes` – Custom pipes (due date, description truncate)
- `/directives` – Custom directives (overdue highlight, etc.)
- `/validators` – Custom form validators (dueDateValidator, tagsArrayValidator)
- `/shared` - Shared components and dummy data:
  - `dummy-data.ts` – Example tasks for testing/demo
  - `task-card` – Reusable card component for displaying task summary
  - `task-form` – Reusable reactive form for task add/edit

## Assumptions & Notes

- Only 'Done' Tasks can be archived
- Archived tasks restore to status ‘Done’
- Overdue Highlight Directive applies to all tasks if due date is in the past (even Done status)
- Priority: Medium by default, Status: To Do by default
- Due date is stored as an ISO string for Material date picker compatibility
- Tags field accepts all input, but highlights validation errors and prevents form submission until resolved.
- Completed tasks have disabled fields (except status) in the edit form, using form control logic and ngClass for styling.
- Demo data is included for quick testing; Have to uncomment line in taskService

## Validation Summary

- Title: Required, 3-50 chars
- Description: Optional, max 200 chars
- Status: Required
- Due Date: Optional, must not be in the past
- Category: Required
- Tags: Optional, max 5, each 2-20 chars

## How to Use

- Add/edit tasks via the “Add Task” button
- Switch sorting with the “Sort by” buttons
- Archive from the main list; restore from the archive screen
- Delete, Details Page from the main list (TaskCard)

## Extra Features

- Priority field with dynamic sorting
- Completed Task Fields Disabled 
- Toggle between sorting by priority and sorting by creation date

## Author

- Zaziba Ahmed
