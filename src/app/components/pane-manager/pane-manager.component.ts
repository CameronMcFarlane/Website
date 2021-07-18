import { Component, HostListener } from '@angular/core';
import { PaneComponent } from './pane/pane.component';

@Component({
  selector: 'app-pane-manager',
  templateUrl: "./pane-manager.component.html"
})
export class PaneManagerComponent {
  // The height of the browser window
  public windowHeight: number;
  // The width of the browser window
  public windowWidth: number;
  // Determines if a pane is currently being moved
  private moving: boolean;
  // Determines if a pane is currently being resized
  private resizing: boolean;
  // The active pane having an action performed
  public activePane: PaneComponent;

  constructor() {
    this.moving = false;
    this.windowOnResize();
  }

  // Allows the document mousemove function to move the pane
  public initiateMove(pane: PaneComponent): void {
    this.moving = true;
    this.activePane = pane;
  }

  // Allows the document mousemove function to resize the pane
  public initiateResize(pane: PaneComponent): void {
    this.resizing = true;
    this.activePane = pane;
  }

  // Moves the pane based on the new mouse coordinates provided
  private movePane(newX: number, newY: number): void {
    // Calculate the new coordinates of the mouse relative to the pane
    var newRelativeX = newX - this.activePane.left;
    var newRelativeY = newY - this.activePane.top;
    // Use the difference between the two relative coordinates to calculate new pane coordinates
    var newPaneLeft = this.activePane.left + (newRelativeX - this.activePane.anchorX);
    var newPaneTop = this.activePane.top + (newRelativeY - this.activePane.anchorY);
    // Check movement against the X boundaries of the browser window
    if (newPaneLeft < 0) {
      newPaneLeft = 0;
    } else if (newPaneLeft + this.activePane.width > this.windowWidth) {
      newPaneLeft = (this.windowWidth - this.activePane.width);
    }
    // Check movement against the Y boundaries of the browser window
    if (newPaneTop < 0) {
      newPaneTop = 0;
    } else if (newPaneTop + this.activePane.height > this.windowHeight) {
      newPaneTop = (this.windowHeight - this.activePane.height);
    } 
    // Update the position of the pane
    this.activePane.left = newPaneLeft;
    this.activePane.top = newPaneTop;
  }

  // Resizes the pane based on the new mouse coordinates provided
  private resizePane(newX: number, newY: number): void {
    // Calculate the new coordinates of the mouse relative to the pane
    var newRelativeX = (this.activePane.left + this.activePane.width) - newX;
    var newRelativeY = (this.activePane.top + this.activePane.height) - newY;
    // Use the different between the two relative coordinates to calculate the new pane size
    var newPaneWidth = this.activePane.width - (newRelativeX - this.activePane.anchorX);
    var newPaneHeight = this.activePane.height - (newRelativeY - this.activePane.anchorY);
    // Check resize against the X boundaries of the browser window
    if (this.activePane.left + newPaneWidth > this.windowWidth) {
      newPaneWidth = this.windowWidth - this.activePane.left;
    } else if (newPaneWidth < this.activePane.minWidth) {
      newPaneWidth = this.activePane.minWidth;
    }
    // Check resize against the Y boundaries of the browser window
    if (this.activePane.top + newPaneHeight > this.windowHeight) {
      newPaneHeight = this.windowHeight - this.activePane.top;
    } else if (newPaneHeight < this.activePane.minHeight) {
      newPaneHeight = this.activePane.minHeight;
    }
    // Update the size of the pane
    this.activePane.height = newPaneHeight;
    this.activePane.width = newPaneWidth;
  }

  @HostListener('document:mouseup', [])
  public documentOnMouseUp(): void {
    if (this.moving) {
      this.moving = false;
    } else if (this.resizing) {
      this.resizing = false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  public documentOnMouseMove(event: any): void {
    if (this.moving) {
      // Prevents text from being highlighted
      event.preventDefault();
      this.movePane(event.clientX, event.clientY);
    } else if (this.resizing) {
      // Prevents text from being highlighted
      event.preventDefault();
      this.resizePane(event.clientX, event.clientY);
    }
  }

  @HostListener('window:resize', [])
  public windowOnResize(): void {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }  
}