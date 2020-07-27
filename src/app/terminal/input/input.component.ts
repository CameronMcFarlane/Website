import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'terminal-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  // Whether the input is editable or not
  editable: boolean = true;
  // An array of previously used commands
  history: string[] = [];
  // The index of the history item being displayed
  historyIndex: number = -1;
  // Stores the text entered into the input
  inputText: string;

  // The event fired when the ENTER key is pressed
  @Output() keyEnter = new EventEmitter<string>();

  /**
   * Stores current input text in case we want to come back to it.
   * @param event The event data provided by the event. 
   */
  public storeInput(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.inputText = "";
    } else if (event.code != "ArrowUp" && event.code != "ArrowDown") {
      this.inputText = (<HTMLSpanElement>event.target).innerText;
    }
  }

  /**
   * Manages functionality for ENTER, UP and DOWN keys.
   * @param event The event data provided by the event.
   */  
  public processCommand(event: KeyboardEvent) {
    // Get the input span
    let input: HTMLSpanElement = <HTMLSpanElement>event.target;

    switch (event.code) {
      // Move back through the history array
      case "ArrowUp":
        event.preventDefault();
        this.historyIndex--;
        this.updatePrompt(<HTMLSpanElement>event.target);
        break;

      // Move forward through the history array
      case "ArrowDown":
        event.preventDefault();
        this.historyIndex++;
        this.updatePrompt(<HTMLSpanElement>event.target);
        break;

      // Send command to terminal
      case "Enter":
        event.preventDefault();
        this.keyEnter.emit(this.escapeHTML(input.innerText));
        this.history.push(input.innerText);
        this.historyIndex = this.history.length;
        input.innerText = "";
        break;
    }
  }

  /**
   * Update the prompt depending on the historyIndex property.
   * @param input The contenteditable input span HTML element.
   */
  private updatePrompt(input: HTMLSpanElement) {
    // Check if the historyIndex is within the bounds of the history array
    // If so, update span with history item
    if (this.historyIndex >= 0 && this.historyIndex < this.history.length) {
      input.innerText = this.history[this.historyIndex];
      
    // Check if historyIndex is greater than the size of the array
    // If so, put the current input text into the span
    } else if (this.historyIndex >= this.history.length) {
      this.historyIndex = this.history.length;
      input.innerText = this.inputText;

    // Check if historyIndex is less than the size of the array
    // If so, reset index to 0
    } else if (this.historyIndex < 0) {
      this.historyIndex = 0;
    }
  }

  /**
   * Escapes the given string and returns a safe string.
   * @param unsafe The unsafe string. 
   */
  private escapeHTML(unsafe: string): string {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }
}
