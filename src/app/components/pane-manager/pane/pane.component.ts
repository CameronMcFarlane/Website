import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";

@Component({
  selector: "app-pane",
  templateUrl: "./pane.component.html",
  styleUrls: ["./pane.component.css"]
})
export class PaneComponent {
  // The Y coordinate of the top-left corner of the pane
  public top: number;
  // The X coordinate of the top-left corner of the pane
  public left: number;
  // The total width and height of the pane
  public width: number;
  public height: number;
  // The minimum height and width allowed for this pane
  public minHeight: number;
  public minWidth: number;
  // The mouse coordinates where the pane was clicked
  public anchorX: number;
  public anchorY: number;
  // The z-index of this pane
  public zIndex: number;

  @ViewChild('pane') 
  public pane: ElementRef;

  @Output('startMove') 
  public startMoveEvent: EventEmitter<PaneComponent>;

  @Output('startResize')
  public startResizeEvent: EventEmitter<PaneComponent>;

  constructor() {
    this.top = 200;
    this.left = 200;
    this.width = 500;
    this.height = 350;
    this.minWidth = 500;
    this.minHeight = 350;
    this.startMoveEvent = new EventEmitter();
    this.startResizeEvent = new EventEmitter();
  }

  // Initiates the move event, handled by the parent pane manager
  move(event: any) {
    // Calculate coordinates of the mouse relative to the top left corner of the pane
    this.anchorX = event.clientX - this.left;
    this.anchorY = event.clientY - this.top;
    // Notify the pane manager to start moving this pane
    this.startMoveEvent.emit(this);
  }

  // Initiates the resize event, handled by the parent pane manager
  resize(event: any) {
    // Calculate coordinates of the mouse relative to the bottom right corner of the pane
    this.anchorX = (this.left + this.width) - event.clientX;
    this.anchorY = (this.top + this.height) - event.clientY;
    // Notify the pane manager to start resizing this pane
    this.startResizeEvent.emit(this);
  }
}