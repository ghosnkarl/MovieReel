import classes from './Carousel.module.css';
import { useState } from 'react';
import CarouselItem from './CarouselItem';
import { useQuery } from '@tanstack/react-query';
import { discoverReleaseDates } from '../../helpers/discoverParams';
import { fetchResults } from '../../services/http';
import QueryWrapper from '../QueryWrapper';
import { IMovie } from '../../models/mediaModel';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IIdName } from '../../models/commonModel';

interface ICarouselArrow {
  direction: 'left' | 'right';
  handleClick: () => void;
}

const CarouselArrow = ({ direction, handleClick }: ICarouselArrow) => {
  const isRight = direction === 'right';
  return (
    <button
      className={`${classes.arrow} ${classes[`${direction}`]}`}
      onClick={handleClick}
    >
      {isRight ? <MdNavigateNext /> : <MdNavigateBefore />}
    </button>
  );
};

interface ICarouselSlide {
  genres: IIdName[] | undefined;
  current: number;
  content: IMovie[];
}

const CarouselSlide = ({ genres, current, content }: ICarouselSlide) => (
  <CarouselItem
    genres={genres}
    current={{ index: current, isRight: true }}
    content={content}
  />
);

interface ICarousel {
  genres: IIdName[] | undefined;
}

const Carousel = ({ genres }: ICarousel) => {
  const discoverParams = discoverReleaseDates(true, -1, 'month', 5, 'days');
  const upcomingMoviesQuery = useQuery({
    queryKey: ['movies', discoverParams],
    queryFn: () =>
      fetchResults<IMovie>({
        path: 'discover/movie',
        params: discoverParams,
      }),
    retry: 1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!upcomingMoviesQuery.data || upcomingMoviesQuery.data.length === 0) {
    return <div>No upcoming movies available.</div>;
  }

  const movies = upcomingMoviesQuery.data;
  const length = movies.length;

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);

  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1
    );

  return (
    <QueryWrapper query={upcomingMoviesQuery} message='Upcoming Movies'>
      <div className={classes.container}>
        <CarouselSlide
          genres={genres}
          current={currentIndex}
          content={movies}
        />
        <CarouselArrow direction='left' handleClick={prevSlide} />
        <CarouselArrow direction='right' handleClick={nextSlide} />
      </div>
    </QueryWrapper>
  );
};

export default Carousel;
