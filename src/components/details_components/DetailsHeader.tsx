import moment from 'moment';
import classes from '../../styles/details-header.module.css';
import { IGenre } from '../../models/genreModel';
import RatingStar from '../rating/RatingStar';
import { getBackdropImage } from '../../helpers/imageSizes';

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
  const movieDetailsText = `${formattedReleaseDate} • ${formattedGenres} ${
    formattedRuntime ? `• ${formattedRuntime}` : ''
  }`;
  return (
    <div className={classes.header}>
      <img
        className={classes['backdrop-img']}
        src={getBackdropImage(backdrop_path, 'w1280')}
        alt={title}
      />

      <div className={classes['header__text--container']}>
        <h1 className={classes['header__title']}>{title}</h1>
        <div className={classes['header__genres']}>
          <RatingStar value={vote_average} size='medium' />
          <p>{movieDetailsText}</p>
        </div>

        <p className={classes['header__overview']}>{overview}</p>
      </div>
    </div>
  );
};

export default DetailsHeader;
