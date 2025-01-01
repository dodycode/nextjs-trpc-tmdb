import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

import { publicProcedure } from "../../trpc";
import { PeopleHandlerSchema } from "./people.schema";
import { env } from "~/env";

export const peopleHandler = publicProcedure
  .input(PeopleHandlerSchema)
  .query(async ({ input }) => {
    let browser: Browser | BrowserCore;

    if (env.NODE_ENV === "production") {
      const executablePath = await chromium.executablePath();
      browser = await puppeteerCore.launch({
        args: chromium.args,
        headless: chromium.headless,
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
        ],
        headless: true,
      });
    }
    const page = await browser.newPage();

    try {
      await page.goto(
        `https://mydramalist.com/people/top?page=${input?.cursor ?? 1}`,
      );
      await page.waitForSelector(".box");

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
