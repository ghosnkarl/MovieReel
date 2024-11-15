import moment from 'moment';
import classes from '../../styles/details-header.module.css';
import { IGenre } from '../../models/genreModel';
import { getBackdropImage, getPosterImage } from '../../helpers/imageSizes';
import RatingStar from '../rating/RatingStar';
import { ICreatedBy } from '../../models/tvModel';

interface DetailsHeaderProps {
  title: string;
  release_date: string | null;
  runtime: number | null;
  genres: IGenre[];
  vote_average: number;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  first_air_date: string | null;
  last_air_date: string | null;
  created_by: ICreatedBy[] | null;
}

const DetailsHeader = ({
  title,
  release_date,
  runtime,
  genres,
  vote_average,
  overview,
  backdrop_path,
  first_air_date,
  last_air_date,
  created_by,
  poster_path,
}: DetailsHeaderProps) => {
  const formattedGenres = genres.map((genre) => genre.name).join(' • ');
  const formattedReleaseDate = moment(release_date).format('MMM DD, YYYY');
  const formattedRuntime =
    runtime && runtime !== 0
      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
      : null;
  const formattedCreatedBy = created_by
    ?.map((creators) => creators.name)
    .join(', ');
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
              {formattedReleaseDate} • {formattedRuntime}
            </p>
          </div>
          <p className={classes['header__overview']}>{overview}</p>
        </div>

        {/* <div className={classes['details__container']}>
            <div>
              {release_date && <h4>Release Date</h4>}
              {first_air_date && <h4>First Air Date</h4>}
              {last_air_date && <h4>Last Air Date</h4>}
              {formattedRuntime && <h4>Runtime</h4>}
              {created_by && created_by.length > 0 && <h4>Created By</h4>}
            </div>
            <div className={classes['values__container']}>
              {release_date && <p>{formattedReleaseDate}</p>}
              {first_air_date && (
                <p>{moment(first_air_date).format('MMM DD, YYYY')}</p>
              )}
              {last_air_date && (
                <p>{moment(last_air_date).format('MMM DD, YYYY')}</p>
              )}
              {formattedRuntime && <p>{formattedRuntime}</p>}
              {created_by && created_by.length > 0 && (
                <p>{formattedCreatedBy}</p>
              )}
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default DetailsHeader;
