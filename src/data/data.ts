import { HorizontalContainerProps } from '../components/horizontal_list/containers/HorizontalTabListContainer';
import { discoverReleaseDates } from '../helpers/discoverParams';
import { discover, fetchMovies, fetchPopular } from '../services/http';

const upComingDates = discoverReleaseDates(true, 5, 'days', 26, 'days');
const nowPlayingDates = discoverReleaseDates(true, -1, 'month', 5, 'days');
const airingTodayDates = discoverReleaseDates(false, 0, 'days', 0, 'days');
const onAirDates = discoverReleaseDates(false, 0, 'days', 7, 'days');

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

const TABS = {
  movies: [
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
  ],
  tv: [
    {
      title: 'Airing Today',
      value: airingTodayDates,
      query: discover('tv', airingTodayDates),
    },
    {
      title: 'On The Air',
      value: onAirDates,
      query: discover('tv', onAirDates),
    },
  ],
  popular_people: [
    {
      title: 'Popular',
      value: 'popular_people',
      query: fetchPopular(),
    },
  ],
};

interface HomepageListsProps {
  movies: HorizontalContainerProps;
  tv: HorizontalContainerProps;
  people: HorizontalContainerProps;
}

export const HOMEPAGE_LISTS: HomepageListsProps = {
  movies: {
    title: 'Movies',
    tabs: TABS.movies,
    queryStr: 'movies',
    type: 'movies',
  },
  tv: {
    title: 'TV Shows',
    tabs: TABS.tv,
    queryStr: 'tv',
    type: 'tv',
  },
  people: {
    title: 'Popular People',
    tabs: TABS.popular_people,
    queryStr: 'popular_people',
    type: 'people',
  },
};
