import { useQuery } from '@tanstack/react-query';
import { getBackdropImage, getPosterImage } from '../../../helpers/imageSizes';
import { fetchResults } from '../../../services/http';
import classes from './TopTrending.module.css';
import RatingStar from '../../rating/RatingStar';
import LinkWrapper from '../../ui/LinkWrapper';
import HeaderLink from '../../ui/HeaderLink';
import { IMovie, ITVShow } from '../../../models/mediaModel';
import { MediaType } from '../../../models/commonModel';
import { formatDate } from '../../../helpers/dateFormatter';
import LoadingIndicator from '../../ui/loading_indicator/LoadingIndicator';
import ErrorBlock from '../../ui/error_block/ErrorBlock';

const getTitle = (item: IMovie | ITVShow) =>
  'title' in item ? item.title : item.name;

const getDate = (item: IMovie | ITVShow) =>
  'title' in item ? item.release_date : item.first_air_date;

const getImageUrl = (item: IMovie | ITVShow, isTopOne: boolean) =>
  isTopOne
    ? getBackdropImage(item.backdrop_path, 'w780')
    : getPosterImage(item.poster_path, 'w185');

const getItemLink = (item: IMovie | ITVShow) =>
  `/${'title' in item ? 'movies' : 'tv'}/${item.id}`;

interface ITopTrendingItem {
  item: IMovie | ITVShow;
  isTopOne: boolean;
}

const TopTrendingItem = ({ item, isTopOne }: ITopTrendingItem) => {
  const title = getTitle(item);
  const date = getDate(item);
  const imageUrl = getImageUrl(item, isTopOne);
  const styleType = isTopOne ? 'top' : 'regular';

  return (
    <LinkWrapper key={item.id} link={getItemLink(item)}>
      <div
        className={`${classes['item__container']} ${
          classes[`item__container--${styleType}`]
        }`}
      >
        <img className={classes[`image--${styleType}`]} src={imageUrl} />

        <div className={classes[`item__container__text--${styleType}`]}>
          <h1 className={classes[`title--${styleType}`]}>{title}</h1>
          <RatingStar
            value={item.vote_average}
            size='small'
            isSingleStar={true}
            vote_count={item.vote_count}
          />
          <p className={classes[`date--${styleType}`]}>{formatDate(date)}</p>
        </div>
      </div>
    </LinkWrapper>
  );
};

interface ITopTrending {
  type: MediaType;
}

const TopTrending = ({ type }: ITopTrending) => {
  const trendingQuery = useQuery({
    queryKey: [type, 'trending'],
    queryFn: () =>
      fetchResults<IMovie | ITVShow>({
        path: `trending/${type}/week`,
        params: null,
      }),
    retry: 1,
  });

  const isMovie = type === 'movie';
  const message = `Trending ${isMovie ? 'Movies' : 'TV Shows'}`;
  const headerTitle = `Top 5 ${isMovie ? 'Movies' : 'TV Shows'} of the Week`;

  if (trendingQuery.isLoading)
    return <LoadingIndicator title={`Fetching ${message}...`} />;

  if (trendingQuery.isError)
    return (
      <ErrorBlock
        message={`There was an error fetching ${message.toLocaleLowerCase()}`}
        onTryAgainClick={trendingQuery.refetch}
      />
    );

  const moviesData = trendingQuery.data!;

  const list = moviesData.slice(1, 5);
  const firstItem = moviesData[0];

  return (
    <div>
      <HeaderLink title={headerTitle} link='/movies' linkState={null} />
      <div className={classes.container}>
        <TopTrendingItem item={firstItem} isTopOne />
        <ul className={classes['container__right']}>
          {list.map((listItem) => (
            <TopTrendingItem
              key={listItem.id}
              item={listItem}
              isTopOne={false}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopTrending;
