import {
  getSniffedResourcePages,
  getSniffedResources,
} from "../core/list-all-collections.js";
import { colorize, log } from "../utils/amazing-log.js";

export function registerGazeCommand(program) {
  program
    .command("gaze")
    .arguments(
      "[domains...]",
      "list all sniffed pages or webpages for provided domain"
    )
    .action(async (domains) => {
      if (!domains || domains.length === 0) {
        const collections = await getSniffedResources();
        log(`sniffed collections:\n`);
        for (const collection of collections) {
          log(`>> ${collection}`);
        }
        process.exit(0);
        F;
      } else {
        const collections = await getSniffedResourcePages(domains);

        for (const collection of collections) {
          console.log(
            colorize(collection.domain).white,
            colorize(collection.pages.length).white
          );

          for (const page of collection.pages) {
            console.log(` - ${page.url}`);
          }
        }
      }
    });
}
