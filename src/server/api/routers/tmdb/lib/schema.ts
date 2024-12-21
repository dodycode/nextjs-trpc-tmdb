import { z } from "zod";

const MovieResult = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  posterImage: z.string(),
  backdrop_path: z.string().nullable(),
  backdropImage: z.string(),
  release_date: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  genre_ids: z.array(z.number()),
  video: z.boolean(),
  adult: z.boolean(),
});

const TVShowResult = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string(),
  first_air_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  original_language: z.string(),
  original_name: z.string(),
  genre_ids: z.array(z.number()),
  origin_country: z.array(z.string()),
});

export const DiscoverTVResponse = z.object({
  page: z.number(),
  results: z.array(TVShowResult),
  total_results: z.number(),
  total_pages: z.number(),
});

export const DiscoverMovieResponse = z.object({
  page: z.number(),
  results: z.array(MovieResult),
  total_results: z.number(),
  total_pages: z.number(),
});
