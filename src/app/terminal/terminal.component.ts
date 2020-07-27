import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Command } from './commands/command';
import { ClearCommand } from './commands/clear.command';
import { LoginCommand } from "./commands/login.command";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TerminalComponent implements OnInit {
  // The username of the user logged in
  username: string;
  // The current 'directory' we are in
  directory: string;
  // The data to output
  outputs: string[];
  // List of available commands
  commands: Command[];
  // The name of any running command
  activeCommand: string;

  /**
   * Constructor. Initialise all properties and
   * add all available commands.
   */
  constructor() { 
    this.username = "guest";
    this.directory = "/";
    this.outputs = [];

    this.commands = [
      new ClearCommand(),
      new LoginCommand()
    ]
  }

  /**
   * Angular Constructor. 
   * Executes once all components are ready.
   */
  ngOnInit(): void {
    this.addPrompt();
  }

  /**
   * Adds a prompt to the terminal window.
   */
  private addPrompt() {
    this.outputs.push(
      '<span class="terminal-user">' + this.username + '@mcfarlane</span>'
      + '<span>:</span>'
      + '<span class="terminal-directory">' + this.directory + '</span>'
      + '<span>$&nbsp;</span>'
    )
  }

  /**
   * Sets the focus on the input field of the terminal.
   */
  public setFocusOnInput(): void {
    let input: HTMLSpanElement = document.getElementById('terminal-input');
    input.focus();
  }

  /**
   * Processes the text received from the input field.
   * @param input The text received from the input
   */
  public processInput(input: string): void {
    // Ensure that the div always scrolls to the bottom
    let terminalText: HTMLCollection = document.getElementsByClassName('terminal-text');
    terminalText[0].scrollTop = terminalText[0].scrollHeight;

    // Add command to the output
    this.outputs[this.outputs.length - 1] += input + '<br/>';

    // Divide up the keyword and arguments
    let keyword: string = input.trim().split(' ')[0];
    let args: string[] = input.trim().split(' ').slice(1);

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