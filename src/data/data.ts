import { discoverReleaseDates } from '../helpers/discoverParams';
import { discover, fetchPaginatedResults } from '../services/http';

const upComingDates = discoverReleaseDates(true, 5, 'days', 26, 'days');
const nowPlayingDates = discoverReleaseDates(true, -1, 'month', 5, 'days');
const airingTodayDates = discoverReleaseDates(false, 0, 'days', 0, 'days');
const onAirDates = discoverReleaseDates(false, 0, 'days', 7, 'days');

export const MOVIE_TABS = [
  {
    title: 'Trending',
    value: 'trending',
    query: fetchPaginatedResults({
      path: 'trending/movie/week',
      params: null,
    }),
  },
  {
    title: 'Upcoming',
    value: upComingDates,
    query: discover('movie', upComingDates),
  },
  {
    title: 'Now Playing',
    value: nowPlayingDates,
    query: discover('movie', nowPlayingDates),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchPaginatedResults({ path: 'movie/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchPaginatedResults({ path: 'movie/top_rated', params: null }),
  },
];

export const CREDITS_TABS = [
  { title: 'Cast', value: 'cast' },
  { title: 'Crew', value: 'crew' },
];

export const TV_TABS = [
  {
    title: 'Trending',
    value: 'trending',
    query: fetchPaginatedResults({
      path: 'trending/tv/week',
      params: null,
    }),
  },
  {
    title: 'Airing Today',
    value: airingTodayDates,
    query: discover('tv', airingTodayDates),
  },
  {
    title: 'On Air',
    value: onAirDates,
    query: discover('tv', onAirDates),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchPaginatedResults({ path: 'tv/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchPaginatedResults({ path: 'tv/top_rated', params: null }),
  },
];
