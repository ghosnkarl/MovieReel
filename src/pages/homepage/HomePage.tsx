import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../../services/http';
import classes from './Homepage.module.css';
import { IPeople } from '../../models/peopleModel';
import { airingTodayDates, upComingDates } from '../../helpers/discoverHelpers';
import HorizontalWrapper from '../../components/horizontal_list/HorizontalWrapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Carousel from '../../components/carousel/Carousel';
import useTrending from '../../hooks/useTrending';
import { IMedia } from '../../models/mediaModel';
import CarouselCoverflow from '../../components/carousel_coverflow/CarouselCoverflow';
import { MOVIE_TYPE, PERSON_TYPE } from '../../helpers/constants';

export default function HomePage() {
  const upcomingMoviesQuery = useQuery({
    queryKey: ['movie', upComingDates],
    queryFn: () =>
      fetchResults<IMedia>({ path: 'discover/movie', params: upComingDates }),
    retry: 1,
  });

  const airingTodayTVQuery = useQuery({
    queryKey: ['tv', airingTodayDates],
    queryFn: () =>
      fetchResults<IMedia>({ path: 'discover/tv', params: airingTodayDates }),
    retry: 1,
  });

  const popularPeopleQuery = useQuery({
    queryKey: ['popular', 'person'],
    queryFn: () =>
      fetchResults<IPeople>({ path: 'person/popular', params: null }),
    retry: 1,
  });

  const trendingQuery = useTrending({ type: 'movie' });

  const tvTrendingQuery = useTrending({ type: 'tv' });

  return (
    <div className={classes.container}>
      <Carousel />

      <div className={classes['main-content']}>
        <HorizontalWrapper
          query={upcomingMoviesQuery}
          title='Upcoming Movies'
          link='/movie'
          type={MOVIE_TYPE}
        />

        {trendingQuery.data && (
          <CarouselCoverflow
            data={trendingQuery.data}
            media_type={MOVIE_TYPE}
          />
        )}

        <HorizontalWrapper
          query={airingTodayTVQuery}
          title='Airing Today TV Shows'
          link='/tv'
          type='tv'
        />

        {tvTrendingQuery.data && (
          <CarouselCoverflow data={tvTrendingQuery.data} media_type='tv' />
        )}

        <HorizontalWrapper
          query={popularPeopleQuery}
          title='Most Popular Celebrities'
          link='/person'
          type={PERSON_TYPE}
        />
      </div>
    </div>
  );
}
