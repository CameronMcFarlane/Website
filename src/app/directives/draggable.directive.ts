import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {

  constructor(element: ElementRef) {
    element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('click') onClick() {
    console.log('working');
  }

}