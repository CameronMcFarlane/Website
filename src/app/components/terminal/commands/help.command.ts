import { Command } from "./command";
import { TerminalComponent } from "../terminal.component";

export class HelpCommand implements Command {
    // A list of keywords which will trigger this command
    alias: string[] = ['help'];

    /**
     * Displays a list of all available commands.
     * @param terminal A reference to the terminal object.
     * @param args A list of arguments given for this command.
     * @returns True if more input is required, false if finished.
     */
    public execute(terminal: TerminalComponent, args: string[]): boolean {
        let output: string = "";
        for (let i = 0; i < terminal.commands.length; i++) {
            output += terminal.commands[i].alias.toString()
                + ": " + terminal.commands[i].getDescription();
            if (i != terminal.commands.length - 1) output += "<br/>";
        }
        terminal.outputs.push(output);
        return false;
    }

    /**
     * Returns a short description of what this command does.
     * @returns A short description of this command.
     */
    public getDescription(): string {
        return "outputs a list of available commands"
    }
}