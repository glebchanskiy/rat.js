import { dropCollections } from "../core/eject-collections.js";
import { getSniffedResources } from "../core/list-all-collections.js";
import { log } from "../utils/amazing-log.js";
import { inputPrompt } from "../utils/prompt.js";




export function registerEjectCommand(program) {
  program
    .command("eject")
    .arguments(
      "[domains...]",
      "remove all provided domains from sniffed collections"
    )
    .action(async (domains) => {
      log(`snff-snff... Are you sure you want to delete these pages?\n`);

      for (const domain of domains) {
        log(`>> ${domain}`);
      }

      log('')
      
      const prompt = inputPrompt("y/n >>> ");

      if (prompt === "y") {
        log(`\nsniff-sniff... deleting... `);
        await dropCollections(domains)
        log(`done...`)
      }
      process.exit(0);
    });
}
