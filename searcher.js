#!/Users/glebchanskiy/.nvm/versions/node/v18.17.1/bin/node

import { Command } from "commander"
import {
  registerEjectCommand,
  registerGazeCommand,
  registerSniffCommand,
  registerSearchCommand,
} from "./commands/index.js";

const program = new Command();

program
  .name("sercher")
  .description("A CLI for indexing web pages and searching through them")
  .version("0.0.1");

registerSearchCommand(program);
registerSniffCommand(program);
registerGazeCommand(program);
registerEjectCommand(program);

await program.parseAsync(process.argv);
