import moment from 'moment';
import classes from '../../styles/details-header.module.css';

import { GenreInterface } from '../../models/genreModel';
import RatingStar from '../rating/RatingStar';
import { getBackdropImage } from '../../helpers/imageSizes';

interface DetailsHeaderProps {
  title: string;
  release_date: string;
  runtime: number;
  genres: GenreInterface[];
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
  return (
    <div className={classes.header}>
      <img
        className={classes['backdrop-img']}
        src={getBackdropImage(backdrop_path, 'w1280')}
        alt={title}
      />
      <div className={classes['header__text--container']}>
        <p className={classes['header__genres']}>
          {genres.map((genre) => genre.name).join(' • ')}
        </p>
        <h1 className={classes['header__title']}>{title}</h1>
        <div className={classes['header__details']}>
          <RatingStar value={vote_average} size='medium' />
          <p className={classes['header__date']}>
            {moment(release_date).format('MMM DD, YYYY')}
            {runtime !== 0 && (
              <>
                {' • '}
                <span>
                  {Math.floor(runtime / 60)}h {runtime % 60}m
                </span>
              </>
            )}
          </p>
        </div>

        <p className={classes['header__overview']}>{overview}</p>
      </div>
    </div>
  );
};

export default DetailsHeader;
