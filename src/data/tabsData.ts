import { TabObjectProps } from '../components/ui/tabs/Tabs';
import { MediaType } from '../helpers/constants';
import {
  airingTodayDates,
  nowPlayingDates,
  onAirDates,
  upComingDates,
} from '../helpers/discoverHelpers';

export const MOVIE_TABS: TabObjectProps[] = [
  {
    title: 'Upcoming',
    value: upComingDates,
    path: 'discover/movie',
    params: upComingDates,
  },
  {
    title: 'Now Playing',
    value: nowPlayingDates,
    path: 'discover/movie',
    params: nowPlayingDates,
  },
  {
    title: 'Popular',
    value: 'popular',
    path: 'movie/popular',
    params: null,
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    path: 'movie/top_rated',
    params: null,
  },
];

export const CREDITS_TABS = [
  { title: 'Biography', value: 'biography' },
  { title: 'Movies', value: MediaType.MOVIE },
  { title: 'TV Shows', value: MediaType.TV },
  { title: 'Crew', value: 'crew' },
  { title: 'Images', value: 'images' },
];

export const DETAILS_TABS = [
  { title: 'Overview', value: 'overview' },
  { title: 'Cast', value: 'cast' },
  { title: 'Crew', value: 'crew' },
  { title: 'Reviews', value: 'reviews' },
  { title: 'Videos', value: 'videos' },
  { title: 'Images', value: 'images' },
];

export const TV_TABS: TabObjectProps[] = [
  {
    title: 'Airing Today',
    value: airingTodayDates,
    path: 'discover/tv',
    params: airingTodayDates,
  },
  {
    title: 'On Air',
    value: onAirDates,
    path: 'discover/tv',
    params: onAirDates,
  },
  {
    title: 'Popular',
    value: 'popular',
    path: 'tv/popular',
    params: null,
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    path: 'tv/top_rated',
    params: null,
  },
];
