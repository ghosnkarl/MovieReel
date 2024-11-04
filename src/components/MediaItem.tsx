import { NavLink } from 'react-router-dom';
import classes from '../styles/media-item.module.css';
import MotionDiv from './ui/MotionDiv';
import Rating from './rating/Rating';
import { getPosterImage } from '../helpers/imageSizes';

interface MediaItemProps {
  text: string;
  id: number;
  poster_path: string;
  title: string | undefined;
  vote_average: number;
  type: 'movies' | 'tv';
}

const MediaItem = ({
  text,
  id,
  poster_path,
  title,
  vote_average,
  type,
}: MediaItemProps) => {
  return (
    <MotionDiv key={id}>
      <NavLink to={`/${type}/${id}`} className={classes['container']}>
        <div className={classes['img-container']}>
          <img src={getPosterImage(poster_path, 'w342')} alt={title} />

          <div className={classes['rating-container']}>
            <Rating value={(vote_average * 10).toFixed(0)} size='small' />
          </div>
        </div>
        <div className={classes['text-container']}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </NavLink>
    </MotionDiv>
  );
};

export default MediaItem;
