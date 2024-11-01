import classes from '../../styles/carousel.module.css';
import { useState } from 'react';
import CarouselItem, { CarouselItemInterface } from './CarouselItem';
import { GenreInterface } from '../../models/genreModel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { discoverReleaseDates } from '../../helpers/discoverParams';
import { discover } from '../../services/http';
import LoadingIndicator from '../ui/LoadingIndicator';
import ErrorBlock from '../ui/ErrorBlock';

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
  const { data, isError, refetch } = useQuery({
    queryKey: ['movies', discoverParams],
    queryFn: () => discover('movie', discoverParams),
    retry: 1,
  });

  let content = <LoadingIndicator title='Fetching Upcoming Movies' />;

  if (isError) {
    content = (
      <ErrorBlock
        title='Error Fetching Upcoming Movies'
        message='There was an error loading upcoming movies.'
        onTryAgainClick={refetch}
      />
    );
  }

  const [current, setCurrent] = useState<CarouselItemInterface>({
    index: 0,
    isRight: true,
  });

  if (data) {
    const length = data.length;

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
        <CarouselItem genres={genres} current={current} content={data} />
        <CarouselArrow direction='right' handleClick={nextSlide} />
        <CarouselArrow direction='left' handleClick={prevSlide} />
      </>
    );
  }

  return <div className={classes.container}>{content}</div>;
};

export default Carousel;
