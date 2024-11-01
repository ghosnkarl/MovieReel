import { useQuery } from '@tanstack/react-query';
import { getBackdropImage, getPosterImage } from '../../helpers/imageSizes';

import { fetchTrendingMovies, fetchTrendingTV } from '../../services/http';
import classes from './top-trending.module.css';
import moment from 'moment';
import RatingStar from '../rating/RatingStar';
import LoadingIndicator from '../ui/LoadingIndicator';
import ErrorBlock from '../ui/ErrorBlock';
import LinkWrapper from '../LinkWrapper';
import HeaderLink from '../HeaderLink';

const TopTrending = ({ type }: { type: 'movie' | 'tv' }) => {
  const { data, isError, refetch } = useQuery({
    queryKey: [type, 'trending'],
    queryFn: () =>
      type === 'movie' ? fetchTrendingMovies('week') : fetchTrendingTV('week'),
    retry: 1,
  });

  const title = type === 'movie' ? 'Movies' : 'TV';

  let content = <LoadingIndicator title={`Fetching Trending ${title}...`} />;

  if (isError) {
    content = (
      <ErrorBlock
        title={`Error Fetching Trending ${title}`}
        message={`There was an error loading trending ${title.toLocaleLowerCase()}.`}
        onTryAgainClick={refetch}
      />
    );
  }
  if (data) {
    const list = data.slice(1, 5);
    content = (
      <div className={classes.container}>
        <LinkWrapper link={`/movies/${data[0].id}`}>
          <div className={classes['container__left']}>
            <img src={getBackdropImage(data[0].backdrop_path, 'w780')} />
            <div className={classes['container__left--text']}>
              <h1>{data[0].title || data[0].name}</h1>
              <div>
                <RatingStar value={data[0].vote_average} size='medium' />
                <p> {moment(data[0].release_date).format('MMM DD, YYYY')}</p>
              </div>
            </div>
          </div>
        </LinkWrapper>
        <ul className={classes['container--right']}>
          {list.map((listItem) => (
            <LinkWrapper key={listItem.id} link={`/movies/${listItem.id}`}>
              <li className={classes['item-container']}>
                <img src={getPosterImage(listItem.poster_path, 'w185')} />

                <div className={classes['item-container--right']}>
                  <h1>{listItem.title || listItem.name}</h1>
                  <RatingStar value={listItem.vote_average} size='small' />
                  <p className={classes.date}>
                    {moment(listItem.release_date).format('MMM DD, YYYY')}
                  </p>
                </div>
              </li>
            </LinkWrapper>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1 className='section__title'>
        <HeaderLink
          title={`Top 5 ${
            type === 'movie' ? 'Movies' : 'TV Shows'
          } of the Week`}
          link='/movies'
          linkState={null}
        />
      </h1>
      <>{content}</>
    </div>
  );
};

export default TopTrending;
