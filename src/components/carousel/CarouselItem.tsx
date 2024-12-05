import { IMovie } from '../../models/mediaModel';
import { getBackdropImage } from '../../helpers/imageSizes';
import classes from './CarouselItem.module.css';
import RatingStar from '../rating/RatingStar';
import { IIdName } from '../../models/commonModel';
import { formatDate, getGenres } from '../../helpers/commonHelpers';
import { NavLink } from 'react-router-dom';

interface ICarousel {
  item: IMovie;
  genres: IIdName[] | undefined;
}

const CarouselItem = ({ item, genres }: ICarousel) => (
  <div className={classes['item__container']}>
    <img
      className={classes.backdrop}
      src={getBackdropImage(item.backdrop_path, 'w1280')}
      alt={item.title}
    />
    <div className={classes['text__container']}>
      {genres && (
        <p className={classes.genres}>{getGenres(item.genre_ids, genres)}</p>
      )}
      <h1 className={classes.title}>{item.title}</h1>
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
      <NavLink to={`/movies/${item.id}`} className={classes.watch}>
        Learn More
      </NavLink>
    </div>
  </div>
);

export default CarouselItem;
