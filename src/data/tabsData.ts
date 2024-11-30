import { TabObjectProps } from '../components/ui/Tabs';
import {
  airingTodayDates,
  nowPlayingDates,
  onAirDates,
  upComingDates,
} from '../helpers/discoverDates';
import { IMovie, ITVShow } from '../models/mediaModel';
import { fetchResults } from '../services/http';

export const MOVIE_TABS: TabObjectProps[] = [
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

export const TV_TABS = [
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