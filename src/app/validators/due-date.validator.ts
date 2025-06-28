import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dueDateValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null; // Not required, so valid if empty

    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time

    if (selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  };
}
