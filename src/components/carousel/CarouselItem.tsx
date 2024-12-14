import { IMedia } from '../../models/mediaModel';
import { getBackdropImage } from '../../helpers/imageSizes';
import classes from './CarouselItem.module.css';
import RatingStar from '../rating/RatingStar';
import { IIdName } from '../../models/commonModel';
import { formatDate, getGenres } from '../../helpers/commonHelpers';
import { NavLink } from 'react-router-dom';
import { MediaType } from '../../helpers/constants';
import { FiArrowRight } from 'react-icons/fi';

interface ICarousel {
  item: IMedia;
  genres: IIdName[] | undefined;
  media_type: MediaType;
}

const CarouselItem = ({ item, genres, media_type }: ICarousel) => (
  <div className={classes['item__container']}>
    <img
      className={classes.backdrop}
      src={getBackdropImage(item.backdrop_path, 'w1280')}
      alt={item.title || item.name}
    />
    <div className={classes['text__container']}>
      {genres && (
        <p className={classes.genres}>{getGenres(item.genre_ids, genres)}</p>
      )}
      <h1 className={classes.title}>{item.title || item.name}</h1>
      <div className={classes['details__container']}>
        <RatingStar
          value={item.vote_average}
          size='medium'
          vote_count={item.vote_count}
        />

        <p className={classes.date}>
          {item.release_date && `${formatDate(item.release_date)}`}
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
