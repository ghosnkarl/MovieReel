import classes from '@/pages/homepage/Homepage.module.css';
import { airingTodayDates, upComingDates } from '@/helpers/discoverHelpers';
import HorizontalWrapper from '@/components/horizontalList/HorizontalWrapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Carousel from '@/components/carousel/Carousel';
import useTrending from '@/hooks/useTrending';
import useDiscover from '@/hooks/useDiscover';
import usePopularPeople from '@/hooks/usePopularPeople';
import { MediaType } from '@/helpers/constants';

export default function HomePage() {
  const upcomingMoviesQuery = useDiscover({
    mediaType: MediaType.MOVIE,
    params: upComingDates,
  });

  const airingTodayTVQuery = useDiscover({
    mediaType: 'tv',
    params: airingTodayDates,
  });

  const popularPeopleQuery = usePopularPeople();
  const trendingQuery = useTrending({ type: MediaType.MOVIE });
  const tvTrendingQuery = useTrending({ type: MediaType.TV });

  return (
    <div className={classes.container}>
      <Carousel />

      <HorizontalWrapper
        query={upcomingMoviesQuery}
        title='Upcoming Movies'
        link='/movie'
        type={MediaType.MOVIE}
      />

      <HorizontalWrapper
        query={trendingQuery}
        title='Trending Movies'
        link={null}
        type={MediaType.MOVIE}
      />

      <HorizontalWrapper
        query={airingTodayTVQuery}
        title='Airing Today TV Shows'
        link='/tv'
        type={MediaType.TV}
      />

      <HorizontalWrapper
        query={tvTrendingQuery}
        title='Trending TV Shows'
        link={null}
        type={MediaType.TV}
      />

      <HorizontalWrapper
        query={popularPeopleQuery}
        title='Most Popular Celebrities'
        link='/person'
        type={MediaType.PERSON}
      />
    </div>
  );
}
