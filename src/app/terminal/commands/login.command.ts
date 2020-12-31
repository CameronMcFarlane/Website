import { Command } from './command';
import { TerminalComponent } from '../terminal.component';

/**
 * A command for logging in to this session.
 */
export class LoginCommand implements Command {
    // A list of keywords which will trigger this command
    public alias: string[] = ['login'];
    
    // The username for the attempted login
    private username: string = '';
    // The password for the attempted login
    private password: string = '';

    /**
     * Executes the login process.
     * @param terminal A reference to the terminal object.
     * @param args A list of arguments given for this command.
     * @returns True if more input is required, false if finished.
     */
    public execute(terminal: TerminalComponent, args: string[]): boolean {
        let output: string;
        
        if (args.length < 1) {
            output = "username: ";
        } else {
            output = "password: ";
        }

        terminal.outputs[terminal.outputs.length - 1] += output;
        return true;
    }
}