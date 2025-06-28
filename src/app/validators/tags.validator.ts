import { AbstractControl, ValidatorFn } from '@angular/forms';

export function tagsValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const tags = control.value;
    if (!tags) return null;
    if (tags.length > 5) return { maxTags: true };
    for (const tag of tags) {
      if (tag.length < 2) return { tagMinLength: true };
      if (tag.length > 20) return { tagMaxLength: true };
    }
    return null;
  };
}
