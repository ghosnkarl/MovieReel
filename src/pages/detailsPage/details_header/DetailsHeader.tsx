import classes from './DetailsHeader.module.css';
import Rating from '../../../components/rating/Rating';
import { IDetails } from '../../../models/detailsModel';
import GenresList from '../../../components/lists/genresList/GenresList';
import DetailsMediaItem from '../../../components/detailsMediaItem/DetailsMediaItem';
import { tmdbImage } from '../../../helpers/imageSizes';
import { format } from '../../../helpers/format';

interface IDetailsHeader {
  media: IDetails;
}

const DetailsHeader = ({ media }: IDetailsHeader) => {
  const {
    genres,
    runtime,
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
        className={classes.headerPoster}
        src={tmdbImage.poster(poster_path, 'w780')}
        alt={title || name}
      />
      <div className={classes.headerInfo}>
        <div className={classes.headerRatingGenres}>
          <Rating rating={vote_average} />
          <GenresList genres={genres} />
        </div>
        <h1 className={classes.headerTitle}>{title || name}</h1>

        <p className={classes.headerTagline}>{tagline}</p>
        <p className={classes.headerOverview}>{overview}</p>

        <div className={classes.headerDetails}>
          <DetailsMediaItem title='Status' text={status} />
          <DetailsMediaItem
            title='Release Date'
            text={release_date ? format.date(release_date) : undefined}
          />
          <DetailsMediaItem title='Runtime' text={formattedRuntime} />

          <DetailsMediaItem
            title='Last Air Date'
            text={last_air_date ? format.date(last_air_date) : undefined}
          />

          <DetailsMediaItem
            title='First Air Date'
            text={first_air_date ? format.date(first_air_date) : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
