import { z } from "zod";

const MovieResult = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
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

const imageResult = z.object({
  aspect_ratio: z.number(),
  height: z.number(),
  iso_639_1: z.string().nullable(),
  file_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  width: z.number(),
});

const videoResult = z.object({
  id: z.string(),
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
});

const castResult = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  character: z.string(),
  order: z.number(),
  credit_id: z.string(),
  adult: z.boolean(),
  gender: z.number(),
  known_for_department: z.string(),
  original_name: z.string(),
  popularity: z.number(),
});

const crewResult = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  job: z.string(),
  credit_id: z.string(),
  adult: z.boolean(),
  gender: z.number(),
  known_for_department: z.string(),
  original_name: z.string(),
  popularity: z.number(),
});

const genreResult = z.object({
  id: z.number(),
  name: z.string(),
});

export type GenreResult = z.infer<typeof genreResult>;

const productionCompanyResult = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

const productionCountryResult = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

const spokenLanguageResult = z.object({
  iso_639_1: z.string(),
  name: z.string(),
  english_name: z.string(),
});

const castRoleResult = z.object({
  credit_id: z.string(),
  character: z.string(),
  episode_count: z.number().default(0),
  total_episode_count: z.number().default(0),
  order: z.number().default(0),
});

const tvCastResult = z.object({
  adult: z.boolean().default(true),
  gender: z.number().default(0),
  id: z.number().default(0),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number().default(0),
  profile_path: z.string().nullable(),
  roles: z.array(castRoleResult),
});

const tvCrewJobResult = z.object({
  credit_id: z.string(),
  job: z.string(),
  episode_count: z.number().default(0),
  department: z.string(),
  total_episode_count: z.number().default(0),
});

const tvCrewResult = z.object({
  adult: z.boolean().default(true),
  gender: z.number().default(0),
  id: z.number().default(0),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number().default(0),
  profile_path: z.string().nullable(),
  jobs: z.array(tvCrewJobResult),
});

const createdByResult = z.object({
  id: z.number().default(0),
  credit_id: z.string(),
  name: z.string(),
  gender: z.number().default(0),
  profile_path: z.string().nullable(),
});

const lastEpisodeToAirResult = z.object({
  id: z.number().default(0),
  name: z.string(),
  overview: z.string(),
  vote_average: z.number().default(0),
  vote_count: z.number().default(0),
  air_date: z.string(),
  episode_number: z.number().default(0),
  production_code: z.string(),
  runtime: z.number().default(0),
  season_number: z.number().default(0),
  show_id: z.number().default(0),
  still_path: z.string().nullable(),
});

const networkResult = z.object({
  id: z.number().default(0),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

const seasonResult = z.object({
  air_date: z.string().nullable(),
  episode_count: z.number().default(0),
  id: z.number().default(0),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  season_number: z.number().default(0),
  vote_average: z.number().default(0),
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

export const MovieImagesResponse = z.object({
  id: z.number(),
  backdrops: z.array(imageResult),
  posters: z.array(imageResult),
  logos: z.array(imageResult),
});

export const MovieVideosResponse = z.object({
  id: z.number(),
  results: z.array(videoResult),
});

export const MovieCreditsResponse = z.object({
  id: z.number(),
  cast: z.array(castResult),
  crew: z.array(crewResult),
});

export const MovieDetailsResponse = z.object({
  id: z.number(),
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable(),
      backdrop_path: z.string().nullable(),
    })
    .nullable(),
  budget: z.number(),
  genres: z.array(genreResult),
  homepage: z.string().nullable(),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(productionCompanyResult),
  production_countries: z.array(productionCountryResult),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(spokenLanguageResult),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const TVShowCreditsResponse = z.object({
  id: z.number().default(0),
  cast: z.array(tvCastResult),
  crew: z.array(tvCrewResult),
});

export const TVShowDetailsResponse = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string(),
  genres: z.array(genreResult),
  homepage: z.string().nullable(),
  number_of_seasons: z.number(),
  number_of_episodes: z.number(),
  first_air_date: z.string(),
  last_air_date: z.string(),
  adult: z.boolean().default(true),
  created_by: z.array(createdByResult),
  episode_run_time: z.array(z.number()),
  in_production: z.boolean().default(true),
  languages: z.array(z.string()),
  last_episode_to_air: lastEpisodeToAirResult.nullable(),
  next_episode_to_air: z.string().nullable(),
  networks: z.array(networkResult),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  popularity: z.number().default(0),
  production_companies: z.array(productionCompanyResult),
  production_countries: z.array(productionCountryResult),
  seasons: z.array(seasonResult),
  spoken_languages: z.array(spokenLanguageResult),
  status: z.string(),
  tagline: z.string(),
  type: z.string(),
  vote_average: z.number().default(0),
  vote_count: z.number().default(0),
});

export const detailsResponse = z.discriminatedUnion("details_type", [
  MovieDetailsResponse.extend({
    details_type: z.literal("movie"),
  }).merge(TVShowDetailsResponse.partial()),
  TVShowDetailsResponse.extend({
    details_type: z.literal("tv"),
  }).merge(MovieDetailsResponse.partial()),
]);
