import { JSDOM } from "jsdom";

import { publicProcedure } from "../../trpc";
import { PeopleHandlerSchema } from "./people.schema";
import type { People } from "~/types/people";

// todo: handle infinite scroll
export const peopleHandler = publicProcedure
  .input(PeopleHandlerSchema)
  .query(async ({ input }) => {
    const page = input?.cursor ?? 1;

    // fetch mydramalist page for get popular people
    const resp = await fetch(`https://mydramalist.com/people/top?page=${page}`);

    // get the html into a string
    const htmlText = await resp.text();

    // parse the html with jsdom
    const dom = new JSDOM(htmlText);
    const document = dom.window.document;

    const people: People[] = [];

    // Select all .box elements that contain actor information
    const actorBoxes = document.querySelectorAll(".box");

    actorBoxes.forEach((box) => {
      const actor = {
        name: box.querySelector(".title a")?.textContent?.trim() ?? "",
        image: box.querySelector(".cover img")?.getAttribute("data-src") ?? "",
        url: box.querySelector(".title a")?.getAttribute("href") ?? "",
        nationality:
          box.querySelector(".text-muted .spacer")?.textContent?.trim() ?? "",
        bio: box.querySelector(".content p")?.textContent?.trim() ?? "",
        likes: box.querySelector(".like-cntb")?.textContent?.trim() ?? "0",
      };

      if (actor.name && actor.nationality === "South Korean") {
        people.push(actor);
      }
    });

    return people;
  });
