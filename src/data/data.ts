import { discoverReleaseDates } from '../helpers/discoverParams';
import { discover, fetchMovies } from '../services/http';

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
    query: fetchMovies('popular'),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchMovies('top_rated'),
  },
];
