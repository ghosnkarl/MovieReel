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
    queryKey: ['popular', 'people'],
    queryFn: () =>
      fetchResults<IPeople>({ path: 'person/popular', params: null }),
    retry: 1,
  });

  const trendingQuery = useTrending({ type: 'movie' });

  const tvTrendingQuery = useTrending({ type: 'tv' });

  return (
    <div className={classes.container}>
      <Carousel />

      <HorizontalWrapper
        query={upcomingMoviesQuery}
        title='Upcoming Movies'
        link='/movies'
        type='movies'
      />

      <HorizontalWrapper
        query={trendingQuery}
        title='Trending Movies'
        link={null}
        type='movies'
      />

      <HorizontalWrapper
        query={airingTodayTVQuery}
        title='Airing Today TV Shows'
        link='/tv'
        type='tv'
      />

      <HorizontalWrapper
        query={tvTrendingQuery}
        title='Trending TV Shows'
        link={null}
        type='tv'
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
