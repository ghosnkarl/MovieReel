import { ITabObject } from '../components/ui/tabs/Tabs';
import {
  airingTodayDates,
  nowPlayingDates,
  onAirDates,
  upComingDates,
} from '../helpers/discoverHelpers';
import { IMovie, ITVShow } from '../models/mediaModel';
import { fetchResults } from '../services/http';

export const MOVIE_TABS: ITabObject[] = [
  {
    title: 'Trending',
    value: 'trending',
    query: fetchResults<IMovie>({
      path: 'trending/movie/week',
      params: null,
    }),
  },
  {
    title: 'Upcoming',
    value: upComingDates,
    query: fetchResults<IMovie>({
      path: 'discover/movie',
      params: upComingDates,
    }),
  },
  {
    title: 'Now Playing',
    value: nowPlayingDates,
    query: fetchResults<IMovie>({
      path: 'discover/movie',
      params: nowPlayingDates,
    }),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchResults<IMovie>({ path: 'movie/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchResults<IMovie>({ path: 'movie/top_rated', params: null }),
  },
];

export const CREDITS_TABS = [
  { title: 'Cast', value: 'cast' },
  { title: 'Crew', value: 'crew' },
];

export const DETAILS_TABS = [
  { title: 'Overview', value: 'overview' },
  { title: 'Cast', value: 'cast' },
  { title: 'Crew', value: 'crew' },
  { title: 'Reviews', value: 'reviews' },
  { title: 'Images', value: 'images' },
];

export const TV_TABS: ITabObject[] = [
  {
    title: 'Trending',
    value: 'trending',
    query: fetchResults<ITVShow>({
      path: 'trending/tv/week',
      params: null,
    }),
  },
  {
    title: 'Airing Today',
    value: airingTodayDates,
    query: fetchResults<ITVShow>({
      path: 'discover/tv',
      params: airingTodayDates,
    }),
  },
  {
    title: 'On Air',
    value: onAirDates,
    query: fetchResults<ITVShow>({ path: 'discover/tv', params: onAirDates }),
  },
  {
    title: 'Popular',
    value: 'popular',
    query: fetchResults<ITVShow>({ path: 'tv/popular', params: null }),
  },
  {
    title: 'Top Rated',
    value: 'top_rated',
    query: fetchResults<ITVShow>({ path: 'tv/top_rated', params: null }),
  },
];
