import { ITabObject } from '../components/ui/tabs/Tabs';
import {
  airingTodayDates,
  nowPlayingDates,
  onAirDates,
  upComingDates,
} from '../helpers/discoverHelpers';
import { IMedia } from '../models/mediaModel';
import { fetchResults } from '../services/http';

export const MOVIE_TABS: ITabObject[] = [
  {
    title: 'Upcoming',
    value: upComingDates,
    query: fetchResults<IMedia>({
      path: 'discover/movie',
      params: upComingDates,
    }),
  },
  {
    title: 'Now Playing',
    value: nowPlayingDates,
    query: fetchResults<IMedia>({
      path: 'discover/movie',
      params: nowPlayingDates,
    }),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchResults<IMedia>({ path: 'movie/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchResults<IMedia>({ path: 'movie/top_rated', params: null }),
  },
];

export const CREDITS_TABS = [
  { title: 'Movies', value: 'movies' },
  { title: 'TV Shows', value: 'tv' },
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

export const TV_TABS: ITabObject[] = [
  {
    title: 'Airing Today',
    value: airingTodayDates,
    query: fetchResults<IMedia>({
      path: 'discover/tv',
      params: airingTodayDates,
    }),
  },
  {
    title: 'On Air',
    value: onAirDates,
    query: fetchResults<IMedia>({ path: 'discover/tv', params: onAirDates }),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchResults<IMedia>({ path: 'tv/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchResults<IMedia>({ path: 'tv/top_rated', params: null }),
  },
];
