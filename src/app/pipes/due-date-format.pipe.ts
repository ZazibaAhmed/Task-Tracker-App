import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDateFormat'
})
export class DueDateFormatPipe implements PipeTransform {

  transform(value: string | Date | undefined | null): string {
    if (!value) {
      return 'No Due Date';
    }

    const dueDate = new Date(value);
    if (isNaN(dueDate.getTime())) {
      return 'No Due Date';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    // MM/DD/YYYY format helper
    const format = (date: Date) =>
      `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;

    if (due < today) {
      return `Overdue (${format(due)})`;
    }
    return format(due);
  }

}
