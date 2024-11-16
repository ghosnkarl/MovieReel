import moment from 'moment';
import classes from '../../styles/details-header.module.css';
import { IGenre } from '../../models/genreModel';
import { getBackdropImage, getPosterImage } from '../../helpers/imageSizes';
import RatingStar from '../rating/RatingStar';

interface DetailsHeaderProps {
  title: string;
  release_date: string | null;
  runtime: number | null;
  genres: IGenre[];
  vote_average: number;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

const DetailsHeader = ({
  title,
  release_date,
  runtime,
  genres,
  vote_average,
  overview,
  backdrop_path,
  poster_path,
}: DetailsHeaderProps) => {
  const formattedGenres = genres.map((genre) => genre.name).join(' • ');
  const formattedReleaseDate = release_date
    ? moment(release_date).format('MMM DD, YYYY')
    : null;
  const formattedRuntime =
    runtime && runtime !== 0
      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
      : null;

  return (
    <div className={classes.container}>
      <div className={classes['image__container']}>
        <img
          className={classes['backdrop-img']}
          src={getBackdropImage(backdrop_path, 'w1280')}
          alt={title}
        />
      </div>
      <div className={classes['header__container']}>
        <img
          className={classes['header__poster']}
          src={getPosterImage(poster_path, 'w500')}
          alt={title}
        />
        <div className={classes['text__container']}>
          <p className={classes.genres}>{formattedGenres}</p>
          <h1 className={classes['header__title']}>{title}</h1>

          <div className={classes['details__container']}>
            <RatingStar value={vote_average} size='medium' />

            <p className={classes['header__icon--text']}>
              {formattedReleaseDate && formattedReleaseDate}
              {formattedReleaseDate && formattedRuntime && ' • '}
              {formattedRuntime && formattedRuntime}
            </p>
          </div>
          <p className={classes['header__overview']}>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
