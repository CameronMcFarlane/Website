import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Command } from './commands/command';
import { ClearCommand } from './commands/clear.command';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TerminalComponent implements OnInit {
  
  // The username of the user logged in
  username: string = 'user';
  // The current 'directory' we are in
  directory: string = '~';
  // The data to output
  outputs: string[] = [];
  // List of active commands;
  commands: Command[] = [];

  // Class Constructor
  // Ready all available commands
  constructor() { 
    this.commands.push(new ClearCommand());
  }

  // Angular Constructor
  // Executes after Angular initialisation
  ngOnInit(): void {
    this.addPrompt();
  }

  private addPrompt() {
    this.outputs.push(
      '<span class="terminal-user">' + this.username + '@mcfarlane</span>'
      + '<span>:</span>'
      + '<span class="terminal-directory">' + this.directory + '</span>'
      + '<span>$&nbsp;</span>'
    )
  }

  // Puts the cursor on the prompt when the terminal is clicked
  public setFocusOnPrompt(): void {
    let input: HTMLSpanElement = document.getElementById('prompt-input');
    input.focus();
  }

  // Processes the command received from the prompt
  public processCommand(command: string): void {
    // Ensure that the div always scrolls to the bottom
    let terminalText: HTMLCollection = document.getElementsByClassName('terminal-text');
    terminalText[0].scrollTop = terminalText[0].scrollHeight;
    // Add command to the output
    this.outputs[this.outputs.length - 1] += command + '<br />';
    // Divide up the keyword and arguments
    let keyword: string = command.split(' ')[0];
    let args: string[] = command.split(' ').slice(1);
    // Loop through all known command alias to find a match
    let commandFound: boolean = false;
    for (let command of this.commands) {
      if (command.alias.includes(keyword)) {
        command.execute(this, args);
        commandFound = true;
      }
    }
    // Print error if no valid command was found
    if (!commandFound) {
      this.outputs[this.outputs.length - 1] += 
        keyword + ': command not found<br/>';
    }
    // Adds prompt to screen
    this.addPrompt();
  }

}
