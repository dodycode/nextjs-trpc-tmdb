import { z } from "zod";

const MediaResult = z.object({
  id: z.number().optional().nullable(),
  title: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  poster_path: z.string().optional().nullable(),
  poster_path_base64: z.string().optional().nullable(),
  backdrop_path: z.string().optional().nullable(),
  release_date: z.string().optional().nullable(),
  first_air_date: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  vote_average: z.number().optional().nullable(),
  vote_count: z.number().optional().nullable(),
  popularity: z.number().optional().nullable(),
  original_language: z.string().optional().nullable(),
  original_title: z.string().optional().nullable(),
  original_name: z.string().optional().nullable(),
  genre_ids: z.array(z.number()).optional().nullable(),
  video: z.boolean().optional().nullable(),
  adult: z.boolean().optional().nullable(),
  origin_country: z.array(z.string()).optional().nullable(),
  media_type: z.string().optional().nullable(),
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

const castResult = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  adult: z.boolean(),
  gender: z.number(),
  known_for_department: z.string(),
  original_name: z.string(),
  popularity: z.number(),

  // Fields that can be either for TV shows or movies
  character: z.string().optional(),
  order: z.number().optional(),
  credit_id: z.string().optional(),

  // TV Show specific field
  roles: z.array(castRoleResult).optional(),
});

const tvCrewJobResult = z.object({
  credit_id: z.string(),
  job: z.string(),
  episode_count: z.number().default(0),
  department: z.string().optional(),
  total_episode_count: z.number().default(0),
});

const crewResult = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  adult: z.boolean(),
  gender: z.number(),
  known_for_department: z.string(),
  original_name: z.string(),
  popularity: z.number(),

  // Fields that can be either for TV shows or movies
  job: z.string().optional(),
  credit_id: z.string().optional(),

  // TV Show specific field
  jobs: z.array(tvCrewJobResult).optional(),
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
  runtime: z.number().nullable().default(0),
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

export const DiscoverResponse = z.object({
  page: z.number(),
  results: z.array(MediaResult),
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
  id: z.number().optional(),
  results: z.array(videoResult).optional(),
});

export const MovieCreditsResponse = z.object({
  id: z.number(),
  cast: z.array(castResult),
  crew: z.array(crewResult),
});

export const movieDetailsResponse = z.object({
  id: z.number(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string(),
  genres: z.array(genreResult),
  homepage: z.string().nullable(),
  adult: z.boolean(),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
  original_language: z.string(),
  production_companies: z.array(productionCompanyResult),
  production_countries: z.array(productionCountryResult),
  spoken_languages: z.array(spokenLanguageResult),
  status: z.string(),
  tagline: z.string(),

  // Fields that can be either for TV shows or movies
  name: z.string().optional(), // TV show title
  title: z.string().optional(), // Movie title

  // TV Show specific fields (all optional)
  number_of_seasons: z.number().optional(),
  number_of_episodes: z.number().optional(),
  first_air_date: z.string().nullable().optional(),
  last_air_date: z.string().nullable().optional(),
  created_by: z.array(createdByResult).optional(),
  episode_run_time: z.array(z.number()).optional(),
  in_production: z.boolean().optional(),
  languages: z.array(z.string()).optional(),
  last_episode_to_air: z
    .union([z.string().nullable(), lastEpisodeToAirResult.nullable()])
    .optional(),
  next_episode_to_air: z
    .union([z.string().nullable(), lastEpisodeToAirResult.nullable()])
    .optional(),
  networks: z.array(networkResult).optional(),
  origin_country: z.array(z.string()).optional(),
  original_name: z.string().optional(),
  seasons: z.array(seasonResult).optional(),
  type: z.string().optional(),

  // Movie specific fields (all optional)
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable(),
      backdrop_path: z.string().nullable(),
    })
    .nullable()
    .optional(),
  budget: z.number().optional(),
  imdb_id: z.string().nullable().optional(),
  original_title: z.string().optional(),
  release_date: z.string().optional(),
  revenue: z.number().optional(),
  runtime: z.number().optional(),
  video: z.boolean().optional(),
});
