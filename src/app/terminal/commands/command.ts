import { TerminalComponent } from '../terminal.component';

/**
 * An interface for all core terminal command functionality. 
 */
export interface Command {
    // A list of keywords which will trigger the command
    alias: string[];

    /**
     * Exectutes this command.
     * @param terminal A reference to the terminal object.
     * @param args A list of arguments given for this command.
     */
    execute(terminal: TerminalComponent, args: string[]): void;
}