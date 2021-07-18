import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Command } from './commands/command';
import { ClearCommand } from './commands/clear.command';
import { LoginCommand } from "./commands/login.command";
import { InitCommand } from "./commands/init.command";
import { HelpCommand } from "./commands/help.command";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TerminalComponent implements OnInit, AfterViewChecked {
  // The username of the user logged in
  username: string;
  // The current 'directory' we are in
  directory: string;
  // The data to output
  outputs: string[];
  // Reference to the currently active command
  activeCommand: Command;
  // List of available commands
  commands: Command[];

  /**
   * Constructor. Initialise all properties and
   * add all available commands.
   */
  constructor() { 
    this.username = "guest";
    this.directory = "/";
    this.outputs = [];
    this.activeCommand = null;
    this.commands = [
      new ClearCommand(),
      new LoginCommand(),
      new HelpCommand()
    ]
  }

  // Adds the first prompt to the output
  ngOnInit(): void {
    new InitCommand().execute(this, []);
    this.addPrompt();
  }

  // Ensure that the div always scrolls to the bottom
  ngAfterViewChecked(): void {
    let terminalText: HTMLCollection = document.getElementsByClassName('terminal-text');
    terminalText[0].scrollTop = terminalText[0].scrollHeight;
  }

  /**
   * Adds a prompt to the terminal window.
   */
  private addPrompt() {
    var promptTemplate = 
      '<span class="terminal-user">' + this.username + '@terminal</span>'
      + '<span>:</span>'
      + '<span class="terminal-directory">' + this.directory + '</span>'
      + '<span>$&nbsp;</span>';
    if (this.outputs.length != 0) {
      this.outputs.push('<br/>');
    }
    this.outputs.push(promptTemplate);
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
    // Add command to the output prompt
    this.outputs[this.outputs.length - 1] += input + '<br/>';

    if (this.activeCommand != null) {
      if (!this.activeCommand.execute(this, [input])) {
        this.activeCommand = null;
        this.addPrompt();
      }

    } else {
      // Divide up the keyword and arguments
      let keyword: string = input.trim().split(' ')[0];
      let args: string[] = input.trim().split(' ').slice(1);
      // Loop through all known command alias to find a match
      let commandFound: Command = null;
      for (let command of this.commands) {
        if (command.alias.includes(keyword)) {
          commandFound = command;
        }
      }
      // Print error if no valid command was found
      if (!commandFound) {
        this.outputs[this.outputs.length - 1] += 
          keyword + ': command not found';
        this.addPrompt();
      } else {
        if (commandFound.execute(this, args)) {
          this.activeCommand = commandFound;
        } else {
          this.addPrompt();
        }
      }
    }
  }

  /**
   * Force quits the currently active command.
   */
  public forceQuit(): void {
    this.outputs.push('^C')
    // TODO: Need to reset command here
    // For example, quit login after entering user
    // The user is still there when you restart the process
    this.activeCommand = null;
    this.addPrompt();
  }

}