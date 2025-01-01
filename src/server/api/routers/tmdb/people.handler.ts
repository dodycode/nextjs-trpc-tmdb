import { chromium } from "playwright";
import { publicProcedure } from "../../trpc";
import { PeopleHandlerSchema } from "./people.schema";

export const peopleHandler = publicProcedure
  .output(Array)
  .input(PeopleHandlerSchema)
  .query(async ({ input }) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      await page.goto(
        `https://mydramalist.com/people/top?page=${input?.cursor ?? 1}`,
      );
      await page.waitForSelector(".box");

      const actors = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".box"))
          .map((box) => ({
            name: box.querySelector(".title a")?.textContent ?? "",
            image: box.querySelector(".cover img")?.getAttribute("src") ?? "",
            url: box.querySelector(".title a")?.getAttribute("href") ?? "",
            nationality:
              box.querySelector(".text-muted .spacer")?.textContent?.trim() ??
              "",
            bio: box.querySelector(".content p")?.textContent?.trim() ?? "",
            likes: box.querySelector(".like-cntb")?.textContent?.trim() ?? "0",
          }))
          .filter(
            (actor) => actor.name && actor.nationality === "South Korean",
          );
      });

      return actors;
    } catch (error) {
      console.error("Scraping error:", error);
      return [];
    } finally {
      await browser.close();
    }
  });