import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  
  // The username of the user logged in
  username: string = 'user';
  // The current 'directory' we are in
  directory: string = '~';
  // The data to output
  outputs: object[] = [];

  // Constructors!
  constructor() { }
  ngOnInit(): void { }

  // Puts the cursor on the prompt when the terminal is clicked
  focusPrompt() {
    let prompts: HTMLCollection = document.getElementsByClassName('promptInput');
    (<HTMLSpanElement>prompts[prompts.length - 1]).focus();
  }

  // Processes the command received from the prompt
  processCommand(command: string) {
    this.outputs.push({
      username: this.username,
      directory: this.directory,
      command: command,
      outputLines: []
    })
  }

}
