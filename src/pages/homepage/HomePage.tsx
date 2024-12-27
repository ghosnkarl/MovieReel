import classes from './Homepage.module.css';
import { airingTodayDates, upComingDates } from '../../helpers/discoverHelpers';
import HorizontalWrapper from '../../components/horizontalList/HorizontalWrapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Carousel from '../../components/carousel/Carousel';
import useTrending from '../../hooks/useTrending';
import { MOVIE_TYPE, PERSON_TYPE } from '../../helpers/constants';
import useDiscover from '../../hooks/useDiscover';
import usePopularPeople from '../../hooks/usePopularPeople';

export default function HomePage() {
  const upcomingMoviesQuery = useDiscover({
    mediaType: MOVIE_TYPE,
    params: upComingDates,
  });

  const airingTodayTVQuery = useDiscover({
    mediaType: 'tv',
    params: airingTodayDates,
  });

  const popularPeopleQuery = usePopularPeople();
  const trendingQuery = useTrending({ type: 'movie' });
  const tvTrendingQuery = useTrending({ type: 'tv' });

  return (
    <div className={classes.container}>
      <Carousel />

      <HorizontalWrapper
        query={upcomingMoviesQuery}
        title='Upcoming Movies'
        link='/movie'
        type={MOVIE_TYPE}
      />

      <HorizontalWrapper
        query={trendingQuery}
        title='Trending Movies'
        link={null}
        type={MOVIE_TYPE}
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
        link='/person'
        type={PERSON_TYPE}
      />
    </div>
  );
}
