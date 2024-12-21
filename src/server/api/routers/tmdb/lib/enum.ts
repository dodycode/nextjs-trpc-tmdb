export const TVShowsGenresEnum = {
  "Action & Adventure": 10759,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Kids: 10762,
  Mystery: 9648,
  News: 10763,
  Reality: 10764,
  "Sci-Fi & Fantasy": 10765,
  Soap: 10766,
  Talk: 10767,
  "War & Politics": 10768,
  Western: 37,
} as const;
export type TVShowsGenresEnum =
  (typeof TVShowsGenresEnum)[keyof typeof TVShowsGenresEnum];

export const TVShowsSortByEnum = {
  popularityDesc: "popularity.desc",
  popularityAsc: "popularity.asc",
  voteCountDesc: "vote_count.desc",
  voteCountAsc: "vote_count.asc",
  releaseDateDesc: "first_air_date.desc",
  releaseDateAsc: "first_air_date.asc",
} as const;
export type TVShowsSortByEnum =
  (typeof TVShowsSortByEnum)[keyof typeof TVShowsSortByEnum];
