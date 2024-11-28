import { useQuery } from '@tanstack/react-query';
import { getBackdropImage, getPosterImage } from '../helpers/imageSizes';
import { fetchResults } from '../services/http';
import classes from '../styles/top-trending.module.css';
import RatingStar from './rating/RatingStar';
import LinkWrapper from './LinkWrapper';
import HeaderLink from './HeaderLink';
import QueryWrapper from './QueryWrapper';
import { IMovie, ITVShow } from '../models/mediaModel';
import { MediaType } from '../models/commonModel';
import { formatDate } from '../helpers/dateFormatter';

const TopTredingItem = ({ item }: { item: IMovie | ITVShow }) => {
  const title = 'title' in item ? item.title : item.name;
  const date = 'title' in item ? item.release_date : item.first_air_date;
  return (
    <LinkWrapper
      key={item.id}
      link={`/${'title' in item ? 'movies' : 'tv'}/${item.id}`}
    >
      <li className={classes['item-container']}>
        <img src={getPosterImage(item.poster_path, 'w185')} />

        <div className={classes['item-container--right']}>
          <h1>{title}</h1>
          <RatingStar value={item.vote_average} size='small' />
          <p className={classes.date}>{formatDate(date)}</p>
        </div>
      </li>
    </LinkWrapper>
  );
};

const TopTrending = ({ type }: { type: MediaType }) => {
  const trendingQuery = useQuery({
    queryKey: [type, 'trending'],
    queryFn: () =>
      fetchResults<IMovie | ITVShow>({
        path: `trending/${type}/week`,
        params: null,
      }),
    retry: 1,
  });

  const { data } = trendingQuery;
  const message = `Trending ${type === 'movie' ? 'Movies' : 'TV Shows'}`;

  let content = <></>;

  if (data) {
    const list = data.slice(1, 5);
    const firstItem = data[0];
    const firstItemTitle =
      'title' in firstItem ? firstItem.title : firstItem.name;
    const date =
      'title' in firstItem ? firstItem.release_date : firstItem.first_air_date;
    content = (
      <div className={classes.container}>
        <LinkWrapper
          link={`/${type === 'movie' ? 'movies' : 'tv'}/${firstItem.id}`}
        >
          <div className={classes['container__left']}>
            <img
              src={getBackdropImage(firstItem.backdrop_path, 'w780')}
              alt={firstItemTitle}
            />
            <div className={classes['container__left--text']}>
              <h1>{firstItemTitle}</h1>
              <RatingStar value={firstItem.vote_average} size='small' />
              <p className={classes['top__date']}>{formatDate(date)}</p>
            </div>
          </div>
        </LinkWrapper>
        <ul className={classes['container--right']}>
          {list.map((listItem) => (
            <TopTredingItem key={listItem.id} item={listItem} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <QueryWrapper message={message} query={trendingQuery}>
      <HeaderLink
        title={`Top 5 ${type === 'movie' ? 'Movies' : 'TV Shows'} of the Week`}
        link='/movies'
        linkState={null}
      />
      <>{content}</>
    </QueryWrapper>
  );
};

export default TopTrending;
