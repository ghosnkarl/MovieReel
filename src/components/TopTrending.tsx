import { useQuery } from '@tanstack/react-query';
import { getBackdropImage, getPosterImage } from '../helpers/imageSizes';
import { fetchResults } from '../services/http';
import classes from '../styles/top-trending.module.css';
import moment from 'moment';
import RatingStar from './rating/RatingStar';
import LinkWrapper from './LinkWrapper';
import HeaderLink from './HeaderLink';
import QueryWrapper from './QueryWrapper';
import { IMovie, ITVShow } from '../models/mediaModel';

const TopTrending = ({ type }: { type: 'movie' | 'tv' }) => {
  const trendingQuery = useQuery({
    queryKey: [type, 'trending'],
    queryFn: () =>
      fetchResults({
        path: `trending/${type}/week`,
        params: null,
      }),
    retry: 1,
  });

  const { data } = trendingQuery;

  const message = `Trending ${type === 'movie' ? 'Movies' : 'TV Shows'}`;

  let content = <></>;

  if (data) {
    const list = data.slice(1, 5) as IMovie[] | ITVShow[];
    const firstItem = data[0] as IMovie | ITVShow;
    const firstItemTitle =
      'title' in firstItem ? firstItem.title : firstItem.name;
    content = (
      <div className={classes.container}>
        <LinkWrapper link={`/${type}/${firstItem.id}`}>
          <div className={classes['container__left']}>
            <img
              src={getBackdropImage(firstItem.backdrop_path, 'w780')}
              alt={firstItemTitle}
            />
            <div className={classes['container__left--text']}>
              <h1>{firstItemTitle}</h1>
              <div>
                <RatingStar value={firstItem.vote_average} size='medium' />
                <p> {moment(firstItem.release_date).format('MMM DD, YYYY')}</p>
              </div>
            </div>
          </div>
        </LinkWrapper>
        <ul className={classes['container--right']}>
          {list.map((listItem: IMovie | ITVShow) => {
            const title = 'title' in listItem ? listItem.title : listItem.name;
            return (
              <LinkWrapper key={listItem.id} link={`/movies/${listItem.id}`}>
                <li className={classes['item-container']}>
                  <img src={getPosterImage(listItem.poster_path, 'w185')} />

                  <div className={classes['item-container--right']}>
                    <h1>{title}</h1>
                    <RatingStar value={listItem.vote_average} size='small' />
                    <p className={classes.date}>
                      {moment(listItem.release_date).format('MMM DD, YYYY')}
                    </p>
                  </div>
                </li>
              </LinkWrapper>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <QueryWrapper message={message} query={trendingQuery}>
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
    </QueryWrapper>
  );
};

export default TopTrending;
