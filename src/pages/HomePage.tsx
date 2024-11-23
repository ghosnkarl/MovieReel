import { useQuery } from '@tanstack/react-query';
import { fetchGenres, fetchResults } from '../services/http';
import classes from '../styles/homepage.module.css';
import Carousel from '../components/carousel/Carousel';
import { NavLink } from 'react-router-dom';
import TopTrending from '../components/TopTrending';
import MediaList from '../components/horizontal_list/MediaList';
import { IMovie, ITVShow } from '../models/mediaModel';
import { IPeople } from '../models/peopleModel';
import PersonListItem from '../components/PersonListItem';
import { airingTodayDates, upComingDates } from '../helpers/discoverDates';
import HorizontalWrapper from '../components/HorizontalWrapper';

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

  const genresQuery = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const popularPeopleQuery = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () =>
      fetchResults<IPeople>({ path: 'person/popular', params: null }),
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

      <HorizontalWrapper
        query={upcomingMoviesQuery}
        title='Upcoming Movies'
        link='/movies'
      >
        <MediaList type='movies' data={upcomingMoviesQuery.data} />
      </HorizontalWrapper>

      <TopTrending type='movie' />

      <HorizontalWrapper
        query={airingTodayTVQuery}
        title='Airing Today TV Shows'
        link='/tv'
      >
        <MediaList type='tv' data={airingTodayTVQuery.data} />
      </HorizontalWrapper>

      <TopTrending type='tv' />

      <HorizontalWrapper
        query={popularPeopleQuery}
        title='Most Popular Celebrities'
        link='/people'
      >
        <>
          {popularPeopleQuery.data &&
            popularPeopleQuery.data.map((person) => (
              <PersonListItem
                key={person.id}
                id={person.id}
                text={null}
                title={person.name}
                profile_path={person.profile_path}
              />
            ))}
        </>
      </HorizontalWrapper>
    </div>
  );
}
