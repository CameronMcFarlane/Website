import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[pane]'
})
export class PaneDirective {
  // Reference to the parent pane element
  pane: ElementRef;
  startingMouseX: number;
  startingMouseY: number;
  pageHeight: number;
  pageWidth: number;
  divWidth: number;
  divHeight: number;

  constructor(element: ElementRef) {
    this.pane = element;
    this.pageHeight = window.innerHeight;
    this.pageWidth = window.innerWidth;
    this.divHeight = this.pane.nativeElement.offsetHeight;
    this.divWidth = this.pane.nativeElement.offsetWidth;

    /* Bug with multiple 'draggable' divs.
       The last created window overrides the window.onresize
       so only one window gets the updated page details.*/
    window.onresize = () => {
      this.pageHeight = window.innerHeight;
      this.pageWidth = window.innerWidth;
      console.log(this.pageHeight, this.pageWidth);
    }
  }

  @HostListener('mousedown', ['$event.clientX', '$event.clientY']) onDrag(mouseX: number, mouseY: number) {
    console.log(this.pane.nativeElement.children[0]);
    this.startingMouseX = mouseX;
    this.startingMouseY = mouseY;

    // While the mouse is down, update the position of the pane on every mouse movement
    document.onmousemove = (event) => {
      event.preventDefault();
      // Calculate how far the mouse moved on the X and Y axis
      let newMouseX = this.startingMouseX - event.clientX;
      let newMouseY = this.startingMouseY - event.clientY;
      // Save the new X and Y position of the mouse
      this.startingMouseX = event.clientX;
      this.startingMouseY = event.clientY;
      // Calculate the new top and left position of the window
      let newWindowTop = this.pane.nativeElement.offsetTop - newMouseY;
      let newWindowLeft = this.pane.nativeElement.offsetLeft - newMouseX;
      // Check the window isn't being moved outside of the Y axis boundaries
      if (newWindowTop <= 0) {
        this.pane.nativeElement.style.top = "0px";
      } else if (newWindowTop + this.divHeight >= this.pageHeight) {
        this.pane.nativeElement.style.top = (this.pageHeight - this.divHeight) + "px";
      } else {
        this.pane.nativeElement.style.top = newWindowTop + "px";
      }
      // Check the window isn't being moved outside of the X axis boundaries
      if (newWindowLeft <= 0) {
        this.pane.nativeElement.style.left = "0px";
      } else if (newWindowLeft + this.divWidth >= this.pageWidth) {
        this.pane.nativeElement.style.left = (this.pageWidth - this.divWidth) + "px";
      } else {
        this.pane.nativeElement.style.left = newWindowLeft + "px";
      }
    };

    // Listen for when the mouse is released and reset
    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
}