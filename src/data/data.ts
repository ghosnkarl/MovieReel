import { discoverReleaseDates } from '../helpers/discoverParams';
import { discover, fetchPaginatedResults } from '../services/http';

const upComingDates = discoverReleaseDates(true, 5, 'days', 26, 'days');
const nowPlayingDates = discoverReleaseDates(true, -1, 'month', 5, 'days');

export const MOVIE_TABS = [
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
