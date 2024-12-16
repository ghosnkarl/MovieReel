import { IMedia } from '../../models/mediaModel';
import classes from './CarouselItem.module.css';
import { IIdName } from '../../models/commonModel';
import { getGenres } from '../../helpers/commonHelpers';
import { NavLink } from 'react-router-dom';
import { MediaType } from '../../helpers/constants';
import { FiArrowRight } from 'react-icons/fi';
import Rating from '../rating/Rating';
import { tmdbImage } from '../../helpers/imageSizes';

interface ICarousel {
  item: IMedia;
  genres: IIdName[] | undefined;
  media_type: MediaType;
}

const CarouselItem = ({ item, genres, media_type }: ICarousel) => (
  <div className={classes['item__container']}>
    <img
      className={classes.backdrop}
      src={tmdbImage.backdrop(item.backdrop_path, 'w1280')}
      alt={item.title || item.name}
    />
    <div className={classes['text__container']}>
      {genres && (
        <p className={classes.genres}>{getGenres(item.genre_ids, genres)}</p>
      )}
      <h1 className={classes.title}>{item.title || item.name}</h1>
      <div className={classes['details__container']}>
        <Rating rating={item.vote_average} />

        <p className={classes.date}>
          {item.release_date &&
            `${new Date(item.release_date).toLocaleDateString('en-US', {
              dateStyle: 'medium',
            })}`}
        </p>
      </div>
      <p className={classes.overview}>{item.overview}</p>

      <NavLink to={`/${media_type}/${item.id}`} className={classes.watch}>
        Details <FiArrowRight />
      </NavLink>
    </div>
  </div>
);

export default CarouselItem;
