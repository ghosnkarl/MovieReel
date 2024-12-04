import { motion } from 'framer-motion';
import { IMovie } from '../../models/mediaModel';
import { getBackdropImage } from '../../helpers/imageSizes';
import classes from './carousel.module.css';
import { Fragment } from 'react';
import RatingStar from '../rating/RatingStar';
import { IIdName } from '../../models/commonModel';
import { formatDate, getGenres } from '../../helpers/commonHelpers';

const itemTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: 0.1,
};

interface ICarousel {
  current: { index: number; isRight: boolean };
  content: IMovie[];
  genres: IIdName[] | undefined;
}

const ItemLayout = ({
  genres,
  item,
}: {
  genres: IIdName[] | undefined;
  item: IMovie;
}) => {
  const { release_date } = item;

  return (
    <>
      {' '}
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
            {release_date && `${formatDate(release_date)}`}
          </p>
        </div>
        <p className={classes.overview}>{item.overview}</p>
      </div>
    </>
  );
};

const CarouselItem = ({ current, content, genres }: ICarousel) => (
  <>
    {content.map((slide, index) => (
      <Fragment key={index}>
        {index === current.index && (
          <motion.div
            animate={current.isRight ? { x: [-1000, 0] } : { x: [1000, 0] }}
            transition={itemTransition}
            className={classes['item__container']}
          >
            {/* <NavLink className={classes.item} to={`/movies/${slide.id}`}> */}
            <ItemLayout item={slide} genres={genres} />
            {/* </NavLink> */}
          </motion.div>
        )}
      </Fragment>
    ))}
  </>
);

export default CarouselItem;
