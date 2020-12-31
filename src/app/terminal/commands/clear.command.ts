import { Command } from './command';
import { TerminalComponent } from '../terminal.component';

/**
 * A command for clearing all output from the Terminal.
 */
export class ClearCommand implements Command {
    // A list of keywords which will trigger this command
    public alias: string[] = [ 'clear', 'cls' ];
    
    /**
     * Clears all output from the Terminal.
     * @param terminal Reference to the terminal object.
     * @param args Any arguments provided with the command.
     * @returns True if more input is required, false if finished.
     */
    public execute(terminal: TerminalComponent, args: string[]): boolean {
        terminal.outputs = [];
        return false;
    }
}