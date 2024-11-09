import moment from 'moment';
import classes from '../../styles/details-header.module.css';
import { IGenre } from '../../models/genreModel';
import { getBackdropImage } from '../../helpers/imageSizes';
import RatingStar from '../rating/RatingStar';

interface DetailsHeaderProps {
  title: string;
  release_date: string;
  runtime: number | null;
  genres: IGenre[];
  vote_average: number;
  overview: string;
  backdrop_path: string | null;
}

const DetailsHeader = ({
  title,
  release_date,
  runtime,
  genres,
  vote_average,
  overview,
  backdrop_path,
}: DetailsHeaderProps) => {
  const formattedReleaseDate = moment(release_date).format('MMM DD, YYYY');
  const formattedGenres = genres.map((genre) => genre.name).join(', ');
  const formattedRuntime =
    runtime && runtime !== 0
      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
      : null;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <h1 className={classes['header__title']}>{title}</h1>

          <RatingStar value={vote_average} size='medium' />

          <p className={classes['header__overview']}>{overview}</p>

          <div className={classes['details__container']}>
            <div>
              <h4>Release Date</h4>
              {formattedRuntime && <h4>Runtime</h4>}
              <h4>Genres</h4>
            </div>
            <div>
              <p>{formattedReleaseDate}</p>
              {formattedRuntime && <p>{formattedRuntime}</p>}
              <p>{formattedGenres}</p>
            </div>
          </div>
        </div>
        <div className={classes['image__container']}>
          <div className={classes['gradient-overlay']} />
          <img
            className={classes['backdrop-img']}
            src={getBackdropImage(backdrop_path, 'w1280')}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
