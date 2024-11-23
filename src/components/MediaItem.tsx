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
  const link = type === 'season' ? `seasons/${id}` : `/${type}/${id}`;
  return (
    <NavLink
      to={link}
      className={classes['container__link']}
      state={{ title, image: getPosterImage(poster_path, 'w342') }}
    >
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
