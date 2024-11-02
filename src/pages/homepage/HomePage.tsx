import { useQuery } from '@tanstack/react-query';
import {
  discover,
  fetchGenres,
  fetchPaginatedResults,
} from '../../services/http';
import classes from './homepage.module.css';
import Carousel from '../../components/carousel/Carousel';
import { NavLink } from 'react-router-dom';
import { discoverReleaseDates } from '../../helpers/discoverParams';
import TopTrending from '../../components/TopTrending';
import MediaList from '../../components/horizontal_list/MediaList';
import { MediaListInterface } from '../../models/mediaModel';
import PeopleList from '../../components/horizontal_list/PeopleList';
import { PeopleListInterface } from '../../models/peopleModel';
import QueryWrapper from '../../components/QueryWrapper';
import HorizontalListContainer from '../../components/horizontal_list/HorizontalListContainer';

export default function HomePage() {
  const upComingDates = discoverReleaseDates(true, 5, 'days', 26, 'days');
  const airingTodayDates = discoverReleaseDates(false, 0, 'days', 0, 'days');

  const upcomingMoviesQuery = useQuery({
    queryKey: ['movie', upComingDates],
    queryFn: () => discover('movie', upComingDates),
    retry: 1,
  });

  const airingTodayTVQuery = useQuery({
    queryKey: ['tv', airingTodayDates],
    queryFn: () => discover('tv', airingTodayDates),
    retry: 1,
  });

  const genresQuery = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const popularPeopleQuery = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () =>
      fetchPaginatedResults({ path: 'person/popular', params: null }),
    retry: 1,
  });

  return (
    <div className={classes.container}>
      <div className={classes['header']}>
        <div className={classes['welcome-container']}>
          <p>Movies, TV Shows and People</p>
          <h1>Discover millions of movies, tv shows and people</h1>
          <NavLink className='link--gradient link--discover' to='/discover'>
            Discover
          </NavLink>
        </div>
        <Carousel genres={genresQuery.data} />
      </div>

      <QueryWrapper message='Upcoming Movies' query={upcomingMoviesQuery}>
        <HorizontalListContainer
          link='/movies'
          linkState={null}
          title='Upcoming Movies'
        >
          <MediaList
            type='movies'
            data={upcomingMoviesQuery.data as MediaListInterface[]}
          />
        </HorizontalListContainer>
      </QueryWrapper>

      <TopTrending type='movie' />

      <QueryWrapper message='Airing Today TV Shows' query={airingTodayTVQuery}>
        <HorizontalListContainer
          link='/tv'
          linkState={null}
          title='Airing Today TV Shows'
        >
          <MediaList
            type='tv'
            data={airingTodayTVQuery.data as MediaListInterface[]}
          />
        </HorizontalListContainer>
      </QueryWrapper>

      <TopTrending type='tv' />

      <QueryWrapper query={popularPeopleQuery} message='Popular Celebrities'>
        <HorizontalListContainer
          link='/people'
          linkState={null}
          title='Most Popular Celebrities'
        >
          <PeopleList data={popularPeopleQuery.data as PeopleListInterface[]} />
        </HorizontalListContainer>
      </QueryWrapper>
    </div>
  );
}
