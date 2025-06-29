import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const tagsArrayValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const tags = control.value as string[] | null;
  if (!tags || tags.length === 0) return null; // Tags optional

  const errors: ValidationErrors = {};

  if (tags.length > 5) {
    errors['maxTags'] = true;
  }
  // Tag length checks
  const tooShort = tags.some(tag => tag.length < 2);
  if (tooShort) errors['tagMinLength'] = true;

  const tooLong = tags.some(tag => tag.length > 20);
  if (tooLong) errors['tagMaxLength'] = true;

  return Object.keys(errors).length ? errors : null;
};
