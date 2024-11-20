import { NavLink } from 'react-router-dom';
import classes from '../styles/media-item.module.css';
import { getPosterImage } from '../helpers/imageSizes';

interface MediaItemProps {
  text: string;
  id: number;
  poster_path: string | null;
  title: string | undefined;
  type: 'movies' | 'tv' | 'season';
}

const MediaItem = ({ text, id, poster_path, title, type }: MediaItemProps) => {
  return (
    <NavLink to={`/${type}/${id}`} className={classes['container__link']}>
      <div className={classes['container']}>
        <div className={classes['img-container']}>
          <img src={getPosterImage(poster_path, 'w342')} alt={title} />
        </div>
        <div className={classes['text-container']}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default MediaItem;
