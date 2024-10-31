import { useQuery } from '@tanstack/react-query';
import { discover, fetchGenres } from '../../services/http';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import classes from './homepage.module.css';
import ErrorBlock from '../../components/ui/ErrorBlock';
import Carousel from '../../components/carousel/Carousel';
import HorizontalTabListContainer from '../../components/horizontal_list/containers/HorizontalTabListContainer';
import { HOMEPAGE_LISTS } from '../../helpers/data';
import { NavLink } from 'react-router-dom';
import { discoverReleaseDates } from '../../helpers/discoverParams';
import TopTrending from '../../components/top_trending/TopTrending';

export default function HomePage() {
  const discoverParams = discoverReleaseDates(true, -1, 'month', 5, 'days');
  const { data, isError, refetch } = useQuery({
    queryKey: ['movies', discoverParams],
    queryFn: () => discover('movie', discoverParams),
    retry: 1,
  });

  const genresResult = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  let content = <LoadingIndicator title='Fetching Upcoming Movies' />;

  if (isError) {
    content = (
      <ErrorBlock
        title='Error Fetching Upcoming Movies'
        message='There was an error loading upcoming movies.'
        onTryAgainClick={refetch}
      />
    );
  }

  if (data) {
    content = <Carousel content={data} genres={genresResult.data} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes['header']}>
        <div className={classes['welcome-container']}>
          <p>Movies, TV Shows and People</p>
          <h1>Discover millions of movies, tv shows and people</h1>
          <NavLink className={classes.discover} to='/discover'>
            Discover
          </NavLink>
        </div>
        {content}
      </div>

      <HorizontalTabListContainer
        title={HOMEPAGE_LISTS.movies.title}
        tabs={HOMEPAGE_LISTS.movies.tabs}
        queryStr={HOMEPAGE_LISTS.movies.queryStr}
        type={HOMEPAGE_LISTS.movies.type}
      />

      <TopTrending type='movie' />

      <HorizontalTabListContainer
        title={HOMEPAGE_LISTS.tv.title}
        tabs={HOMEPAGE_LISTS.tv.tabs}
        queryStr={HOMEPAGE_LISTS.tv.queryStr}
        type={HOMEPAGE_LISTS.tv.type}
      />

      <TopTrending type='tv' />

      <HorizontalTabListContainer
        title={HOMEPAGE_LISTS.people.title}
        tabs={HOMEPAGE_LISTS.people.tabs}
        queryStr={HOMEPAGE_LISTS.people.queryStr}
        type={HOMEPAGE_LISTS.people.type}
      />
    </div>
  );
}
