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
    // If the user has logged in successfully or not
    private loggedIn: boolean = false;

    /**
     * Check if the given username is valid.
     * @param username The username to check.
     */
    private checkUsername(username: string): void {
        if (username.trim() != '') {
            this.username = username;
        }
    }

    /**
     * Check if the given password is valid for the set user.
     * @param password The password to check.
     */
    private checkPassword(password: string): void {
        if (password.trim() != '') {
            if (password === 'test') {
                this.password = password;
            }
        }
    }

    /**
     * Executes the login process.
     * @param terminal A reference to the terminal object.
     * @param args A list of arguments given for this command.
     * @returns True if more input is required, false if finished.
     */
    public execute(terminal: TerminalComponent, args: string[]): boolean {
        // Check the inputs
        if (this.username == '' && args.length > 0) this.checkUsername(args[0]);
        else if (this.password == '' && args.length > 0) this.checkPassword(args[0]);
        // Update the prompt based on the current login progress
        if (this.username == '') terminal.outputs.push('username: ');
        else if (this.password == '') terminal.outputs.push('password: ');
        else {
            terminal.outputs.push('logged in succesfully as ' + this.username);
            terminal.username = this.username;
            this.loggedIn = true;
        }

        return !this.loggedIn;
    }

    /**
     * Returns a short description of what this command does.
     * @returns A short description of this command.
     */
    public getDescription(): string {
        return "allows you to log in or something"
    }
}