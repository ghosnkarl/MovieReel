import { useQuery } from '@tanstack/react-query';
import { fetchGenres, fetchResults } from '../services/http';
import classes from '../styles/homepage.module.css';
import Carousel from '../components/carousel/Carousel';
import { NavLink } from 'react-router-dom';
import TopTrending from '../components/TopTrending';
import MediaList from '../components/horizontal_list/MediaList';
import { MediaListInterface } from '../models/mediaModel';
import { PeopleListInterface } from '../models/peopleModel';
import QueryWrapper from '../components/QueryWrapper';
import HorizontalListContainer from '../components/horizontal_list/HorizontalListContainer';
import PersonListItem from '../components/PersonListItem';
import { airingTodayDates, upComingDates } from '../helpers/discoverDates';

export default function HomePage() {
  const upcomingMoviesQuery = useQuery({
    queryKey: ['movie', upComingDates],
    queryFn: () =>
      fetchResults({ path: 'discover/movie', params: upComingDates }),
    retry: 1,
  });

  const airingTodayTVQuery = useQuery({
    queryKey: ['tv', airingTodayDates],
    queryFn: () =>
      fetchResults({ path: 'discover/tv', params: airingTodayDates }),
    retry: 1,
  });

  const genresQuery = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const popularPeopleQuery = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () => fetchResults({ path: 'person/popular', params: null }),
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
          {popularPeopleQuery.data &&
            popularPeopleQuery.data.map((person: PeopleListInterface) => (
              <PersonListItem
                key={person.id}
                id={person.id}
                text={null}
                title={person.name}
                profile_path={person.profile_path}
              />
            ))}
        </HorizontalListContainer>
      </QueryWrapper>
    </div>
  );
}
