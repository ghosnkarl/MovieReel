import classes from '../../styles/carousel.module.css';
import { useState } from 'react';
import CarouselItem, { CarouselItemInterface } from './CarouselItem';
import { GenreInterface } from '../../models/genreModel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { discoverReleaseDates } from '../../helpers/discoverParams';
import { fetchResults } from '../../services/http';
import QueryWrapper from '../QueryWrapper';

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
  genres: GenreInterface[] | undefined;
}

const Carousel = ({ genres }: CarouselProps) => {
  const discoverParams = discoverReleaseDates(true, -1, 'month', 5, 'days');
  const upcomingMoviesQuery = useQuery({
    queryKey: ['movies', discoverParams],
    queryFn: () =>
      fetchResults({ path: 'discover/movie', params: discoverParams }),
    retry: 1,
  });

  const [current, setCurrent] = useState<CarouselItemInterface>({
    index: 0,
    isRight: true,
  });

  let content = <></>;

  if (upcomingMoviesQuery.data) {
    const length = upcomingMoviesQuery.data.length;

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

    content = (
      <>
        <CarouselItem
          genres={genres}
          current={current}
          content={upcomingMoviesQuery.data}
        />
        <CarouselArrow direction='right' handleClick={nextSlide} />
        <CarouselArrow direction='left' handleClick={prevSlide} />
      </>
    );
  }

  return (
    <QueryWrapper query={upcomingMoviesQuery} message='Upcoming Movies'>
      <div className={classes.container}>{content}</div>
    </QueryWrapper>
  );
};

export default Carousel;
