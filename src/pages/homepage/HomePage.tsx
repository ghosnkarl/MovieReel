import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../../services/http';
import classes from './Homepage.module.css';
import { IMovie, ITVShow } from '../../models/mediaModel';
import { IPeople } from '../../models/peopleModel';
import { airingTodayDates, upComingDates } from '../../helpers/discoverHelpers';
import HorizontalWrapper from '../../components/horizontal_list/HorizontalWrapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Carousel from '../../components/carousel/Carousel';

export default function HomePage() {
  const upcomingMoviesQuery = useQuery({
    queryKey: ['movie', upComingDates],
    queryFn: () =>
      fetchResults<IMovie>({ path: 'discover/movie', params: upComingDates }),
    retry: 1,
  });

  const airingTodayTVQuery = useQuery({
    queryKey: ['tv', airingTodayDates],
    queryFn: () =>
      fetchResults<ITVShow>({ path: 'discover/tv', params: airingTodayDates }),
    retry: 1,
  });

  const popularPeopleQuery = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () =>
      fetchResults<IPeople>({ path: 'person/popular', params: null }),
    retry: 1,
  });

  const trendingQuery = useQuery({
    queryKey: ['movie', 'trending'],
    queryFn: () =>
      fetchResults<IMovie>({
        path: `trending/movie/week`,
        params: null,
      }),
    retry: 1,
  });

  const tvTrendingQuery = useQuery({
    queryKey: ['tv', 'trending'],
    queryFn: () =>
      fetchResults<ITVShow>({
        path: `trending/tv/week`,
        params: null,
      }),
    retry: 1,
  });

  return (
    <div className={classes.container}>
      <Carousel />

      <HorizontalWrapper
        query={upcomingMoviesQuery}
        title='Upcoming Movies'
        link='/movies'
        type='movie'
      />

      <HorizontalWrapper
        query={trendingQuery}
        title='Trending Movies'
        link={null}
        type='movie'
      />

      <HorizontalWrapper
        query={airingTodayTVQuery}
        title='Airing Today TV Shows'
        link='/tv'
        type='tvShows'
      />

      <HorizontalWrapper
        query={tvTrendingQuery}
        title='Trending TV Shows'
        link={null}
        type='tvShows'
      />

      <HorizontalWrapper
        query={popularPeopleQuery}
        title='Most Popular Celebrities'
        link='/people'
        type='people'
      />
    </div>
  );
}
