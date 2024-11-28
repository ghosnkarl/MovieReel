import classes from './details-page-header.module.css';
import { getBackdropImage } from '../../helpers/imageSizes';
import { IIdName } from '../../models/commonModel';
import { IoPlayCircle } from 'react-icons/io5';
import { FaImages } from 'react-icons/fa6';
import { MdOutlineReviews } from 'react-icons/md';
import { formatDate } from '../../helpers/dateFormatter';

interface IDetailsHeader {
  title: string;
  release_date: string | null;
  runtime: number | null;
  genres: IIdName[];
  vote_average: number;
  vote_count: number;
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
  vote_count,
}: IDetailsHeader) => {
  const formattedGenres = genres.map((genre) => genre.name).join(' • ');

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
          <p className={classes.tmdb}>TMDB</p>

          <p className={classes['date-runtime']}>
            {vote_average.toFixed(1)} ({vote_count.toLocaleString()})
            {release_date && ` • ${formatDate(release_date)}`}
            {formattedRuntime && ` • ${formattedRuntime}`}
          </p>
        </div>
        <p className={classes.overview}>{overview}</p>
        <div className={classes['actions__container']}>
          <button className={`${classes.watch} ${classes['watch--filled']}`}>
            <IoPlayCircle className={classes.icon} /> Watch Trailer
          </button>
          <button className={`${classes.watch} ${classes['watch--outlined']}`}>
            <FaImages className={classes.icon} /> All Images
          </button>
          <button className={`${classes.watch} ${classes['watch--outlined']}`}>
            <MdOutlineReviews className={classes.icon} /> All Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPageHeader;
