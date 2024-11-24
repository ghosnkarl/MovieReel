import { motion } from 'framer-motion';
import { IMovie } from '../../models/mediaModel';
import { getBackdropImage } from '../../helpers/imageSizes';
import classes from './carousel.module.css';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';
import RatingStar from '../rating/RatingStar';
import { IIdName } from '../../models/commonModel';

const itemTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: 0.1,
};

interface CarouselItemInterface {
  index: number;
  isRight: boolean;
}

const getGenres = (genreIds: number[], genres: IIdName[]) =>
  genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean) // Remove undefined values
    .join(', ');

const CarouselItem = ({
  current,
  content,
  genres,
}: {
  current: CarouselItemInterface;
  content: IMovie[];
  genres: IIdName[] | undefined;
}) => (
  <>
    {content.map((slide, index) => (
      <Fragment key={index}>
        {index === current.index && (
          <motion.div
            animate={current.isRight ? { x: [-1000, 0] } : { x: [1000, 0] }}
            transition={itemTransition}
          >
            <NavLink className={classes.item} to={`/movies/${slide.id}`}>
              <img
                className={classes.backdrop}
                src={getBackdropImage(slide.backdrop_path, 'w780')}
                alt={slide.title}
              />
              <div className={classes['text__container']}>
                <h1 className={classes.title}>{slide.title}</h1>
                {genres && (
                  <p className={classes.genres}>
                    {getGenres(slide.genre_ids, genres)}
                  </p>
                )}
                <RatingStar value={slide.vote_average} size='small' />
              </div>
            </NavLink>
          </motion.div>
        )}
      </Fragment>
    ))}
  </>
);

export default CarouselItem;
