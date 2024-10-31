import classes from './carousel.module.css';
import { useState } from 'react';
import { MediaListInterface } from '../../models/mediaModel';
import CarouselItem, { CarouselItemInterface } from './CarouselItem';
import { GenreInterface } from '../../models/genreModel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface CarouselArrowProps {
  direction: 'left' | 'right';
  handleClick: () => void;
}

const CarouselArrow = ({ direction, handleClick }: CarouselArrowProps) => {
  const isRight = direction === 'right';
  return (
    <div
      className={`${classes['carousel__arrow']} ${
        classes[`carousel__arrow--${direction}`]
      }`}
      onClick={handleClick}
    >
      {isRight && <IoIosArrowForward className={classes.arrow} />}
      {!isRight && <IoIosArrowBack className={classes.arrow} />}
    </div>
  );
};

interface CarouselProps {
  content: MediaListInterface[];
  genres: GenreInterface[] | undefined;
}

const Carousel = ({ content, genres }: CarouselProps) => {
  const [current, setCurrent] = useState<CarouselItemInterface>({
    index: 0,
    isRight: true,
  });
  const length = content?.length;

  const nextSlide = () => {
    setCurrent({
      index: current.index === length - 1 ? 0 : current.index + 1,
      isRight: true,
    });
  };

  const prevSlide = () => {
    setCurrent({
      index: current.index === 0 ? length - 1 : current.index - 1,
      isRight: false,
    });
  };

  return (
    <div className={classes.container}>
      <CarouselItem genres={genres} current={current} content={content} />
      <CarouselArrow direction='right' handleClick={nextSlide} />
      <CarouselArrow direction='left' handleClick={prevSlide} />
    </div>
  );
};

export default Carousel;
