import { IMedia } from '../../models/mediaModel';
import classes from './CarouselItem.module.css';
import { IIdName } from '../../models/commonModel';
import { getGenres } from '../../helpers/commonHelpers';
import { NavLink } from 'react-router-dom';
import { MediaType } from '../../helpers/constants';
import Rating from '../rating/Rating';
import { tmdbImage } from '../../helpers/imageSizes';

interface CarouselItemProps {
  item: IMedia;
  genres: IIdName[] | undefined;
  media_type: MediaType;
}

const CarouselItem = ({ item, genres, media_type }: CarouselItemProps) => (
  <NavLink to={`/${media_type}/${item.id}`} className={classes.itemContainer}>
    <img
      className={classes.backdrop}
      src={tmdbImage.backdrop(item.backdrop_path, 'w1280')}
      alt={item.title || item.name}
    />
    <div className={classes.itemContent}>
      <img
        className={classes.poster}
        src={tmdbImage.poster(item.poster_path, 'w500')}
        alt={item.title || item.name}
      />
      <div className={classes.textContainer}>
        {genres && (
          <p className={classes.genres}>{getGenres(item.genre_ids, genres)}</p>
        )}
        <h1 className={classes.title}>{item.title || item.name}</h1>
        <div className={classes.detailsContainer}>
          <Rating rating={item.vote_average} />

          <p className={classes.date}>
            {item.release_date &&
              `${new Date(item.release_date).toLocaleDateString('en-US', {
                dateStyle: 'medium',
              })}`}
          </p>
        </div>
        <p className={classes.overview}>{item.overview}</p>
      </div>
    </div>
  </NavLink>
);

export default CarouselItem;
