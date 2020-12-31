import { Command } from "./command";
import { TerminalComponent } from "../terminal.component";

export class InitCommand implements Command {
    alias: string[];

    execute(terminal: TerminalComponent, args: string[]): boolean {
        throw new Error("Method not implemented.");
    }
}