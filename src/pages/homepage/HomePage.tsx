import { useQuery } from '@tanstack/react-query';
import { discover, fetchGenres, fetchPopular } from '../../services/http';
import classes from './homepage.module.css';
import Carousel from '../../components/carousel/Carousel';
import { NavLink } from 'react-router-dom';
import { discoverReleaseDates } from '../../helpers/discoverParams';
import TopTrending from '../../components/top_trending/TopTrending';
import HorizontalListContainer from '../../components/horizontal_list/containers/HorizontalListContainer';
import MediaList from '../../components/horizontal_list/MediaList';
import { MediaListInterface } from '../../models/mediaModel';
import PeopleList from '../../components/horizontal_list/PeopleList';
import { PeopleListInterface } from '../../models/peopleModel';

export default function HomePage() {
  const upComingDates = discoverReleaseDates(true, 5, 'days', 26, 'days');
  const airingTodayDates = discoverReleaseDates(false, 0, 'days', 0, 'days');

  const { data: upcomingMovies } = useQuery({
    queryKey: ['movie', upComingDates],
    queryFn: () => discover('movie', upComingDates),
    retry: 1,
  });

  const airingTodayTV = useQuery({
    queryKey: ['tv', airingTodayDates],
    queryFn: () => discover('tv', airingTodayDates),
    retry: 1,
  });

  const genresResult = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const popularPeople = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () => fetchPopular(),
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
        <Carousel genres={genresResult.data} />
      </div>

      {upcomingMovies && (
        <HorizontalListContainer
          link='/movies'
          linkState={null}
          title='Upcoming Movies'
        >
          <MediaList
            type='movies'
            data={upcomingMovies as MediaListInterface[]}
          />
        </HorizontalListContainer>
      )}

      <TopTrending type='movie' />

      {airingTodayTV.data && (
        <HorizontalListContainer
          link='/tv'
          linkState={null}
          title='Airing Today TV Shows'
        >
          <MediaList
            type='tv'
            data={airingTodayTV.data as MediaListInterface[]}
          />
        </HorizontalListContainer>
      )}

      <TopTrending type='tv' />

      {popularPeople.data && (
        <HorizontalListContainer
          link='/people'
          linkState={null}
          title='Most Popular Celebrities'
        >
          <PeopleList data={popularPeople.data as PeopleListInterface[]} />
        </HorizontalListContainer>
      )}
    </div>
  );
}
