import { sniffingPages } from "../core/by-domain-spider-parser.js";
import { log } from "../utils/amazing-log.js";

export function registerSniffCommand(program) {
  program
    .command("sniff")
    .argument("<string>", "url to sniff")
    .description("indexing web pages")
    .action(async (url) => {
        await sniffingPages(url)
        log(`\ndone sniffing ${url}`)
        process.exit(0)
    });
}
