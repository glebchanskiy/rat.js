
import { search } from "../core/search.js";

export function registerSearchCommand(program) {
  program
    .command("search")
    .argument("<query>", "query")
    .option("-p, --pages <string>", "search only among this resource")
    .description("Search for query in all sniffed pages")
    .action(async (query, options) => {
      await search(query, options.pages ? options.pages.split(",") : undefined);
      process.exit(0);
    });
}

// ========================================================
// URL    : https://www.mongodb.com/products/self-managed/community-edition
// TITLE  : MongoDB Community Server | MongoDB
// --------------------------------------------------------
// CONTEXT:
//     - [mongodb]    : Introducing MongoDB 8.0, the fastest MongoDB ever
//     - [javascript] : gives you a fully functional JavaScript and Node.js REPL environment
// ========================================================

// ========================================================
// URL    : https://www.mongodb.com/products/tools/relational-migrator
// TITLE  : MongoDB Relational Migrator | Modernize Legacy Apps | MongoDB
// --------------------------------------------------------
// CONTEXT:
//     - [mongodb]    : Introducing MongoDB 8.0, the fastest MongoDB ever
//     - [javascript] : with MongoDB. Generate Java, JavaScript, and C# code from your new da
// ========================================================