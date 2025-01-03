import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  MovieGenresEnum,
  TVShowsGenresEnum,
} from "~/server/api/routers/tmdb/lib/enum";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#a_simple_example
export function buildThresholdList() {
  const thresholds = [];
  const numSteps = 20;

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

export function generateVideoEmbedUrl(site: string, key: string) {
  switch (site.toLowerCase()) {
    case "youtube":
      return `https://www.youtube.com/embed/${key}`;
    case "vimeo":
      return `https://player.vimeo.com/video/${key}`;
    case "dailymotion":
      return `https://www.dailymotion.com/embed/video/${key}`;
    case "twitch":
      // Assuming 'key' is a video ID. For live streams, you might need a different format
      return `https://player.twitch.tv/?video=${key}&parent=${window.location.hostname}`;
    case "aol":
      return `https://delivery.vidible.tv/htmlembed/pid=${key}/`;
    case "hulu":
      // Hulu doesn't offer a simple embed URL. You might need to use their official embed method
      console.warn("Hulu embedding requires special handling");
      return null;
    case "netflix":
      // Netflix doesn't allow direct embedding of their content
      console.warn("Netflix does not support direct video embedding");
      return null;
    case "crunchyroll":
      // Crunchyroll's embed system is more complex and may require additional parameters
      console.warn("Crunchyroll embedding requires special handling");
      return null;
    default:
      console.warn(`Unsupported video site: ${site}`);
      return null;
  }
}

export function getLabelFromSortbyEnums(value: string) {
  const [text, order] = value.split(".");
  if (!text || !order) return value;
  const capitalizedText = text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const capitalizedOrder = order.charAt(0).toUpperCase() + order.slice(1);
  return `${capitalizedText} (${capitalizedOrder})`;
}

export function getMovieGenreKeys(
  movieGenresEnum: typeof MovieGenresEnum | typeof TVShowsGenresEnum,
  value?: number,
): string[] | string | undefined {
  if (value === undefined) {
    return Object.keys(movieGenresEnum);
  } else {
    const entry = Object.entries(movieGenresEnum).find(
      ([_, val]) => val === value,
    );
    return entry ? entry[0] : undefined;
  }
}
