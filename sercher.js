
// import promptConfing from "prompt-sync";
import { Command } from 'commander';
import { registerSearchCommand } from './commands/search.js';
import { registerSniffCommand } from './commands/sniff.js';
import { registerGazeCommand } from './commands/gaze.js';
import { registerEjectCommand } from './commands/eject.js';


// const inputPrompt = promptConfing({ sigint: true });
// const prompt = inputPrompt(">>> ");

// search(prompt)

const program = new Command();

program
    .name("sercher")
    .description("A CLI for indexing web pages and searching through them")
    .version("0.0.1")

registerSearchCommand(program)
registerSniffCommand(program)
registerGazeCommand(program)
registerEjectCommand(program)

await program.parseAsync(process.argv);