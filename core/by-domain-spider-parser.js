import puppeteer from "puppeteer";
import { DB, MONGO_URI } from "./db.js";
import { fastLog, log } from "../utils/amazing-log.js";

export async function sniffingPages(url) {
  const domain = new URL(url).hostname;
  const db = await new DB(MONGO_URI).conect();

  const collection = db.retriveCollection(domain);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const visitedUrls = new Set();

  async function visitPage(url) {
    if (visitedUrls.has(url)) return;
    visitedUrls.add(url);

    await page.goto(url, { waitUntil: "domcontentloaded" });
    const { title, content, links } = await parsePageData(page, domain);
    await savePageToDB(collection, url, title, content);

    for (const link of links) {
      await visitPage(link);
    }
  }

  await visitPage(url);
  db.disconnect();
}

async function savePageToDB(collection, url, title, content) {
  const data = await collection.findOne({ url });

  try {
    if (data) {
      const filter = { url };
      const options = { upsert: true };
      const updateDoc = {
        $set: data,
      };
      await collection.updateOne(filter, updateDoc, options);
      fastLog(`sniffed again: ${url}`);
    } else {
      const data = {
        url,
        title,
        content,
      };
      await collection.insertOne(data);
      fastLog(`sniffed: ${url}`);
    }
  } catch (error) {
    log(
      `when sniffing url ${url}, something incomprehensible happened`, 'ERROR'
    );
  }
}

async function parsePageData(page, domain) {
  const title = await page.title();

  const content = await page.evaluate(() => {
    return document.body.innerText;
  });

  const links = await page.$$eval("a", (anchors) =>
    anchors.map((anchor) => anchor.href)
  );

  return {
    title,
    content,
    links: links
      ? links.filter((link) => link.includes(domain)).map(normalizeUrl)
      : [],
  };
}

function normalizeUrl(url) {
  const parsedUrl = new URL(url);
  parsedUrl.search = "";
  parsedUrl.hash = "";
  return parsedUrl.toString();
}
