import moment from 'moment';
import classes from './details-page-header.module.css';
import { getBackdropImage } from '../../helpers/imageSizes';
import RatingStar from '../rating/RatingStar';
import { IIdName } from '../../models/commonModel';

interface IDetailsHeader {
  title: string;
  release_date: string | null;
  runtime: number | null;
  genres: IIdName[];
  vote_average: number;
  overview: string;

  backdrop_path: string | null;
}

const DetailsPageHeader = ({
  title,
  release_date,
  runtime,
  genres,
  vote_average,
  overview,

  backdrop_path,
}: IDetailsHeader) => {
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
      <img
        className={classes['backdrop__img']}
        src={getBackdropImage(backdrop_path, 'w1280')}
        alt={title}
      />
      <div className={classes['bottom__container']}>
        <p className={classes.genres}>{formattedGenres}</p>
        <h1 className={classes.title}>{title}</h1>

        <div className={classes['rating__container']}>
          <RatingStar value={vote_average} size='medium' />
          <p className={classes['date-runtime']}>
            {formattedReleaseDate}
            {formattedRuntime && ` • ${formattedRuntime}`}
          </p>
        </div>
        <p className={classes.overview}>{overview}</p>
      </div>
    </div>
  );
};

export default DetailsPageHeader;
