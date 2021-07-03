import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject } from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {
  div: ElementRef;
  document: Document;
  startingMouseX: number;
  startingMouseY: number;

  constructor(@Inject(DOCUMENT) document: Document, element: ElementRef) {
    this.div = element;
    this.document = document;
  }

  @HostListener('mousedown', ['$event.clientX', '$event.clientY']) onDrag(mouseX: number, mouseY: number) {
    this.startingMouseX = mouseX;
    this.startingMouseY = mouseY;

    this.document.onmousemove = (event) => {
      event.preventDefault();
      let newMouseX = this.startingMouseX - event.clientX;
      let newMouseY = this.startingMouseY - event.clientY;
      this.startingMouseX = event.clientX;
      this.startingMouseY = event.clientY;
      this.div.nativeElement.style.top = (this.div.nativeElement.offsetTop - newMouseY) + "px";
      this.div.nativeElement.style.left = (this.div.nativeElement.offsetLeft - newMouseX) + "px";
    };
  }

  // startDrag(event: any) {
  //   console.log(event);
  //   event.preventDefault();
  //   let newMouseX = this.startingMouseX - event.clientX;
  //   let newMouseY = this.startingMouseY - event.clientY;
  //   this.startingMouseX = event.clientX;
  //   this.startingMouseY = event.clientY;
  //   this.div.nativeElement.style.top = (this.div.nativeElement.offsetTop - newMouseY) + "px";
  //   this.div.nativeElement.style.left = (this.div.nativeElement.offsetLeft - newMouseX) + "px";
  // }

  @HostListener('mouseup') stopDrag() {
    this.document.onmousemove = null;
  }

}