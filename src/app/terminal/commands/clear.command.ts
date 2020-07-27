import { Command } from './command';
import { TerminalComponent } from '../terminal.component';

export class ClearCommand implements Command {

    alias: string[] = [ 
        'clear',
        'cls'
    ];
    
    execute(terminal: TerminalComponent, args: string[]): void {
        terminal.outputs = [];
    }

}