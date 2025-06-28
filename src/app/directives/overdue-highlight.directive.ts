import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOverdueHighlight]'
})

export class OverdueHighlightDirective implements OnChanges {
  // @Input() dueDate: string | Date | undefined;
  @Input('appOverdueHighlight') appOverdueHighlight: string | Date | undefined;


  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOverdue(this.appOverdueHighlight)) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
      // or use 'backgroundColor', 'rgba(255,0,0,0.1)' for a light red background
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      // and remove background if you add one
    }
  }

  private isOverdue(dueDate: string | Date | undefined): boolean {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  }
}
