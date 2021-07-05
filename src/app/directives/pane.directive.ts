import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[pane]'
})
export class PaneDirective implements OnInit {
  // Reference to the parent pane element
  pane: ElementRef;
  startingMouseX: number;
  startingMouseY: number;
  windowHeight: number;
  windowWidth: number;
  paneWidth: number;
  paneHeight: number;

  constructor(element: ElementRef) {
    this.pane = element;
    /* Bug with multiple 'draggable' divs.
       The last created window overrides the window.onresize
       so only one window gets the updated page details.*/
    window.onresize = () => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      console.log(this.windowHeight, this.windowWidth);
    }
  }

  ngOnInit(): void {
    this.paneHeight = this.pane.nativeElement.clientHeight;
    this.paneWidth = this.pane.nativeElement.clientWidth;
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    // console.log(this.pane.nativeElement.children[0]);
  }

  @HostListener('mousedown', ['$event']) onDrag(event: any) {
    // Calculate coordinates of the mouse relative to the pane
    var relativeX = event.clientX - this.pane.nativeElement.offsetLeft;
    var relativeY = event.clientY - this.pane.nativeElement.offsetTop;

    // While the mouse is down, update the position of the pane on every mouse movement
    document.onmousemove = (event: any) => {
      event.preventDefault();
      // Calculate the new coordinates of the mouse relative to the pane
      var newRelativeX = event.clientX - this.pane.nativeElement.offsetLeft;
      var newRelativeY = event.clientY - this.pane.nativeElement.offsetTop;
      // Use the difference between the two relative coordinates to calculate new pane coordinates
      var newPaneX = this.pane.nativeElement.offsetLeft + (newRelativeX - relativeX);
      var newPaneY = this.pane.nativeElement.offsetTop + (newRelativeY - relativeY);
      // Check movement against the X boundaries of the browser window
      if (newPaneX < 0) {
        this.pane.nativeElement.style.left = "0px";
      } else if (newPaneX + this.paneWidth > this.windowWidth) {
        this.pane.nativeElement.style.left = (this.windowWidth - this.paneWidth) + "px";
      } else {
        this.pane.nativeElement.style.left = newPaneX + "px";
      }
      // Check movement against the Y boundaries of the browser window
      if (newPaneY < 0) {
        this.pane.nativeElement.style.top = "0px";
      } else if (newPaneY + this.paneHeight > this.windowHeight) {
        this.pane.nativeElement.style.top = (this.windowHeight - this.paneHeight) + "px";
      } else {
        this.pane.nativeElement.style.top = newPaneY + "px";
      }
    };

    // Listen for when the mouse is released and reset
    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
}