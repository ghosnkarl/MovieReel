import { motion } from 'framer-motion';
import { MediaListInterface } from '../../models/mediaModel';
import moment from 'moment';
import { GenreInterface } from '../../models/genreModel';
import { getBackdropImage, getPosterImage } from '../../helpers/imageSizes';
import classes from '../../styles/carousel.module.css';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';
import RatingStar from '../RatingStar';

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
  content: MediaListInterface[];
  genres: GenreInterface[] | undefined;
}) => (
  <>
    {content.map((slide, index) => (
      <Fragment key={index}>
        {index === current.index && (
          <motion.div
            animate={current.isRight ? { x: [-1000, 0] } : { x: [1000, 0] }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.1,
            }}
          >
            <NavLink
              className={classes['carousel__item--link']}
              to={`/movies/${slide.id}`}
            >
              <div className='gradient-overlay' />
              <img
                className={classes['carousel__item--backdrop']}
                src={getBackdropImage(slide.backdrop_path, 'w780')}
                alt={slide.title}
              />
              <div className={classes['carousel__item--details']}>
                <img
                  src={getPosterImage(slide.poster_path, 'w185')}
                  alt={slide.title}
                />
                <div className={classes['carousel__item--details--text']}>
                  <h1>{slide.title}</h1>
                  <div className={classes['carousel__item--rating']}>
                    <RatingStar value={slide.vote_average} size='medium' />
                    <p>{moment(slide.release_date).format('MMM DD, YYYY')}</p>
                  </div>
                  <div className={classes['carousel__item--genres']}>
                    {genres && (
                      <>
                        {slide.genre_ids.map((id) => (
                          <span key={id}>
                            {genres.find((genre) => genre.id === id)?.name}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </NavLink>
          </motion.div>
        )}
      </Fragment>
    ))}
  </>
);

export default CarouselItem;
