import classes from './DetailsHeader.module.css';
import { getBackdropImage } from '../../../helpers/imageSizes';
import { IIdName } from '../../../models/commonModel';
import { IoPlayCircle } from 'react-icons/io5';
import { FaImages } from 'react-icons/fa6';
import { MdOutlineReviews } from 'react-icons/md';
import { formatDate } from '../../../helpers/commonHelpers';
import RatingStar from '../../../components/rating/RatingStar';

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

interface IActionButton {
  icon: React.ReactNode;
  text: string;
  styleClass?: string;
}

const ActionButton = ({ icon, text, styleClass = '' }: IActionButton) => (
  <button className={`${classes.watch} ${classes[styleClass]}`}>
    {icon} {text}
  </button>
);

const DetailsHeader = ({
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

      <div className={classes.grid}>
        <div className={classes['bottom__container']}>
          <p className={classes.genres}>{formattedGenres}</p>
          <h1 className={classes.title}>{title}</h1>

          <div className={classes['rating__container']}>
            <RatingStar
              value={vote_average}
              size='medium'
              vote_count={vote_count}
            />
            <p className={classes['date-runtime']}>
              {release_date && `${formatDate(release_date)}`}
              {formattedRuntime && ` • ${formattedRuntime}`}
            </p>
          </div>
          <p className={classes.overview}>{overview}</p>
          <div className={classes['actions__container']}>
            <ActionButton
              icon={<IoPlayCircle className={classes.icon} />}
              text='Watch Trailer'
              styleClass='watch--filled'
            />
            <ActionButton
              icon={<FaImages className={classes.icon} />}
              text='All Images'
              styleClass='watch--outlined'
            />
            <ActionButton
              icon={<MdOutlineReviews className={classes.icon} />}
              text='All Reviews'
              styleClass='watch--outlined'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
