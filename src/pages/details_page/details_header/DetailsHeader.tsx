import classes from './DetailsHeader.module.css';
import { getBackdropImage, getPosterImage } from '../../../helpers/imageSizes';
import { formatDate } from '../../../helpers/commonHelpers';
import Rating from '../../../components/rating/Rating';
import { IDetails } from '../../../models/detailsModel';
import GenresList from '../../../components/lists/genres_list/GenresList';
import DetailsMediaItem from '../../../components/details_media_item/DetailsMediaItem';

interface IDetailsHeader {
  media: IDetails;
}

const DetailsHeader = ({ media }: IDetailsHeader) => {
  const {
    genres,
    runtime,
    backdrop_path,
    vote_average,
    title,
    release_date,
    name,
    first_air_date,
    status,
    last_air_date,
    poster_path,
    tagline,
    overview,
  } = media;

  const formattedRuntime =
    runtime && runtime !== 0
      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
      : undefined;

  return (
    <div className={classes.header}>
      <img
        className={classes['header__backdrop']}
        src={getBackdropImage(backdrop_path, 'w1280')}
        alt={title || name}
      />

      <div className={classes['header__content']}>
        <img
          className={classes['header__poster']}
          src={getPosterImage(poster_path, 'w780')}
          alt={title || name}
        />
        <div className={classes['header__info']}>
          <div className={classes['header__rating-genres']}>
            <Rating rating={vote_average} />
            <GenresList genres={genres} />
          </div>
          <h1 className={classes['header__title']}>{title || name}</h1>

          <p className={classes['header__tagline']}>{tagline}</p>
          <p className={classes['header__overview']}>{overview}</p>

          <div className={classes['header__details']}>
            <DetailsMediaItem title='Status' text={status} />
            <DetailsMediaItem
              title='Release Date'
              text={release_date ? formatDate(release_date) : undefined}
            />
            <DetailsMediaItem title='Runtime' text={formattedRuntime} />

            <DetailsMediaItem
              title='Last Air Date'
              text={last_air_date ? formatDate(last_air_date) : undefined}
            />

            <DetailsMediaItem
              title='First Air Date'
              text={first_air_date ? formatDate(first_air_date) : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
