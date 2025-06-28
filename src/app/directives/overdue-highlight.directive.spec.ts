import { OverdueHighlightDirective } from './overdue-highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('OverdueHighlightDirective', () => {
  it('should create an instance', () => {
    // Mock the dependencies
    const mockElementRef = {} as ElementRef;
    const mockRenderer2 = {} as Renderer2;

    // Create the directive instance with mocks
    const directive = new OverdueHighlightDirective(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
