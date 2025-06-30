import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOverdueHighlight]'
})

export class OverdueHighlightDirective implements OnChanges {
  @Input('appOverdueHighlight') appOverdueHighlight: string | Date | undefined;


  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOverdue(this.appOverdueHighlight)) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #B22234');
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'rgba(178, 34, 52, 0.12)');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
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
