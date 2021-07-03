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
  pageHeight: number;
  pageWidth: number;

  constructor(@Inject(DOCUMENT) document: Document, element: ElementRef) {
    this.div = element;
    this.document = document;
    this.pageHeight = window.innerHeight;
    this.pageWidth = window.innerWidth;

    window.onresize = () => {
      this.pageHeight = window.innerHeight;
      this.pageWidth = window.innerWidth;
      console.log(this.pageHeight, this.pageWidth);
    }
  }

  @HostListener('mousedown', ['$event.clientX', '$event.clientY']) onDrag(mouseX: number, mouseY: number) {
    this.startingMouseX = mouseX;
    this.startingMouseY = mouseY;

    this.document.onmousemove = (event) => {
      event.preventDefault();
      // Calculate how far the mouse moved on the X and Y axis
      let newMouseX = this.startingMouseX - event.clientX;
      let newMouseY = this.startingMouseY - event.clientY;
      // Save the new X and Y position of the mouse
      this.startingMouseX = event.clientX;
      this.startingMouseY = event.clientY;
      // Calculate the new top and left position of the window
      let newWindowTop = this.div.nativeElement.offsetTop - newMouseY;
      let newWindowLeft = this.div.nativeElement.offsetLeft - newMouseX;
      // Check the window isn't being moved outside of the Y axis boundaries
      if (newWindowTop >= 0 && newWindowTop + this.div.nativeElement.offsetHeight <= this.pageHeight) {
        this.div.nativeElement.style.top = newWindowTop + "px";
      }
      // Check the window isn't being moved outside of the X axis boundaries
      if (newWindowLeft >= 0 && newWindowLeft + this.div.nativeElement.offsetWidth <= this.pageWidth) {
        this.div.nativeElement.style.left = newWindowLeft + "px";
      }
    };

    this.document.onmouseup = () => {
      this.document.onmousemove = null;
    };
  }
}