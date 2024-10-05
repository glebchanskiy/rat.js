import { colorize, fastLog, log } from "../utils/amazing-log.js";
import { DB, MONGO_URI } from "./db.js";

export async function search(query, domains) {
  const db = await new DB(MONGO_URI).conect();

  if (domains && domains.length > 0) {
    fastLog(`sniffing for ${colorize(query).cyan} ${colorize('query:').white}`);
    await searchIn(domains, db, query);
  } else {
    const allDomains = (await db.listCollections()).map(o => o.name);
    fastLog(`sniffing for ${colorize(query).cyan} ${colorize(`query through `).white} ${colorize(allDomains.join(', ')).cyan} ${colorize().white}`);
    await searchIn(allDomains, db, query);
  }

  db.disconnect();
}

async function searchIn(domains, db, query) {
  const regexQuery = createRegex(query);
  const searchWords = query.split(/[|&]/).map((word) => word.trim());
  for (const domain of domains) {
    const collection = db.retriveCollection(domain);

    const results = await collection
      .find({ content: { $regex: regexQuery, $options: "gi" } })
      .toArray();

    let isFirst = true;

    if (results.length === 0) {
      log(`\nNo results found for domain ${colorize(domain).cyan} ${colorize().white}\n`);
      continue
    }
    for (const result of results) {
      if (isFirst) {
        console.log("\n", colorize("-".repeat(16)).white, colorize(domain).cyan, colorize("-".repeat(16)).white);
        isFirst = false;
      }
      else console.log('\n ----------');

      console.log();
      console.log(
        `${colorize("URL:").magenta}     : ${colorize(result.url).white}`
      );
      console.log(
        `${colorize("Title:").magenta}   : ${colorize(result.title).white}`
      );
      console.log();
      console.log(colorize("Context:").magenta);

      for (const searchTerm of searchWords) {
        const match = result.content.match(
          new RegExp(`(.{0,30})(${searchTerm})(.{0,30})`, "i")
        );

        if (match) {
          console.log(
            `  - ${padRight(colorize(searchTerm).cyan, 10)} : ${
              colorize(match[0]).white
            }`
          );
        }
      }
    }
  }
  log(`\ndone...`);
}

function createRegex(expression) {
  const orSegments = expression.split("|");

  const regexParts = [];

  orSegments.forEach((segment) => {
    const andWords = segment.split("&").map((word) => word.trim());

    if (andWords.length > 1) {
      regexParts.push(
        andWords.map((word) => `(?=.*${escapeRegex(word)})`).join("")
      );
    } else {
      regexParts.push(escapeRegex(andWords[0]));
    }
  });

  return regexParts.join("|");
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function padRight(str, length) {
  return str + " ".repeat(Math.max(0, length - str.length));
}
