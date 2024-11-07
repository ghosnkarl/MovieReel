import {
  airingTodayDates,
  nowPlayingDates,
  onAirDates,
  upComingDates,
} from '../helpers/discoverDates';
import { fetchResults } from '../services/http';

export const MOVIE_TABS = [
  {
    title: 'Trending',
    value: 'trending',
    query: fetchResults({
      path: 'trending/movie/week',
      params: null,
    }),
  },
  {
    title: 'Upcoming',
    value: upComingDates,
    query: fetchResults({
      path: 'discover/movie',
      params: upComingDates,
    }),
  },
  {
    title: 'Now Playing',
    value: nowPlayingDates,
    query: fetchResults({
      path: 'discover/movie',
      params: nowPlayingDates,
    }),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchResults({ path: 'movie/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchResults({ path: 'movie/top_rated', params: null }),
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
    query: fetchResults({
      path: 'trending/tv/week',
      params: null,
    }),
  },
  {
    title: 'Airing Today',
    value: airingTodayDates,
    query: fetchResults({
      path: 'discover/tv',
      params: airingTodayDates,
    }),
  },
  {
    title: 'On Air',
    value: onAirDates,
    query: fetchResults({ path: 'discover/tv', params: onAirDates }),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchResults({ path: 'tv/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchResults({ path: 'tv/top_rated', params: null }),
  },
];
