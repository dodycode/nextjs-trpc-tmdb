import puppeteer, { type Page, type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

import { publicProcedure } from "../../trpc";
import { PeopleHandlerSchema } from "./people.schema";
import { env } from "~/env";
import { autoScroll } from "./lib/utils";

// todo: handle infinite scroll
export const peopleHandler = publicProcedure
  .input(PeopleHandlerSchema)
  .query(async ({ input }) => {
    let browser: Browser | BrowserCore;

    if (env.NODE_ENV === "production") {
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar",
      );
      browser = await puppeteerCore.launch({
        args: [
          ...chromium.args,
          "--use-gl=angle",
          "--use-angle=swiftshader",
          "--single-process",
          "--no-sandbox",
          "--proxy-server='direct://'",
          "--proxy-bypass-list=*",
        ],
        headless: true,
        executablePath,
        defaultViewport: chromium.defaultViewport,
      });
    } else {
      browser = await puppeteer.launch({
        args: [
          "--use-gl=angle",
          "--use-angle=swiftshader",
          "--single-process",
          "--no-sandbox",
          "--proxy-server='direct://'",
          "--proxy-bypass-list=*",
        ],
        headless: true,
      });
    }
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
    );

    try {
      await page.goto(
        `https://mydramalist.com/people/top?page=${input?.cursor ?? 1}`,
      );
      await page.waitForSelector(".box");

      await autoScroll(page as Page);

      await page.waitForSelector("img.loaded");

      // @ts-expect-error - type issue
      const actors = (await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".box")).map((box) => ({
          name: box.querySelector(".title a")?.textContent ?? "",
          image: box.querySelector(".cover img")?.getAttribute("src") ?? "",
          url: box.querySelector(".title a")?.getAttribute("href") ?? "",
          nationality:
            box.querySelector(".text-muted .spacer")?.textContent?.trim() ?? "",
          bio: box.querySelector(".content p")?.textContent?.trim() ?? "",
          likes: box.querySelector(".like-cntb")?.textContent?.trim() ?? "0",
        }));
      })) as {
        name: string;
        image: string;
        url: string;
        nationality: string;
        bio: string;
        likes: string;
      }[];

      return actors;
    } catch (error) {
      console.error("Scraping error:", error);
      return [];
    } finally {
      await browser.close();
    }
  });
