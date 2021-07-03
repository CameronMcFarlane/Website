import { Command } from "./command";
import { TerminalComponent } from "../terminal.component";

export class InitCommand implements Command {
    // A list of keywords which will trigger the command
    alias: string[];

    /**
     * Displays startup text to the terminal upon execution.
     * @param terminal A reference to the terminal object.
     * @param args A list of arguments given for this command.
     * @returns True if more input is required, false if finished.
     */
    public execute(terminal: TerminalComponent, args: string[]): boolean {
        let output: string 
            = "Welcome to Terminal, a very much work-in-progress project.<br/>"
            + "Type 'help' to see a list of available commands.<br/>";
        terminal.outputs.push(output)
        return false;
    }

    /**
     * Returns a short description of what this command does.
     * @returns A short description of this command.
     */
    public getDescription(): string {
        return "displays any startup text";
    }
}