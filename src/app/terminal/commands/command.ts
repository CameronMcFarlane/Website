import { TerminalComponent } from '../terminal.component';

export interface Command {

    // A list of alias for this command
    alias: string[];

    // Executes this command
    execute(terminal: TerminalComponent, args: string[]): void;

}