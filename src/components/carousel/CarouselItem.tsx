import { motion } from 'framer-motion';
import { IMovie } from '../../models/mediaModel';
import { IGenre } from '../../models/genreModel';
import { getBackdropImage } from '../../helpers/imageSizes';
import classes from '../../styles/carousel.module.css';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';
import RatingStar from '../rating/RatingStar';

const itemTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: 0.1,
};

export interface CarouselItemInterface {
  index: number;
  isRight: boolean;
}

const CarouselItem = ({
  current,
  content,
  genres,
}: {
  current: CarouselItemInterface;
  content: IMovie[];
  genres: IGenre[] | undefined;
}) => (
  <>
    {content.map((slide, index) => (
      <Fragment key={index}>
        {index === current.index && (
          <motion.div
            animate={current.isRight ? { x: [-1000, 0] } : { x: [1000, 0] }}
            transition={itemTransition}
          >
            <NavLink
              className={classes['carousel__item--link']}
              to={`/movies/${slide.id}`}
            >
              <img
                className={classes['carousel__item--backdrop']}
                src={getBackdropImage(slide.backdrop_path, 'w780')}
                alt={slide.title}
              />
              <div className={classes['carousel__item--details']}>
                <h1 className={classes['carousel__item--title']}>
                  {slide.title}
                </h1>
                {genres && (
                  <p className={classes['carousel__item--genres']}>
                    {slide.genre_ids
                      .map((id) => {
                        return genres.find((genre) => genre.id === id)?.name;
                      })
                      .join(', ')}
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
