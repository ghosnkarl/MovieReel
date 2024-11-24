import classes from './carousel.module.css';
import { useState } from 'react';
import CarouselItem from './CarouselItem';
import { useQuery } from '@tanstack/react-query';
import { discoverReleaseDates } from '../../helpers/discoverParams';
import { fetchResults } from '../../services/http';
import QueryWrapper from '../QueryWrapper';
import { IMovie } from '../../models/mediaModel';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IIdName } from '../../models/commonModel';

interface CarouselArrowProps {
  direction: 'left' | 'right';
  handleClick: () => void;
}

const CarouselArrow = ({ direction, handleClick }: CarouselArrowProps) => {
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

const CarouselControls = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => (
  <>
    <CarouselArrow direction='left' handleClick={onPrev} />
    <CarouselArrow direction='right' handleClick={onNext} />
  </>
);

const CarouselSlide = ({
  genres,
  current,
  content,
}: {
  genres: IIdName[] | undefined;
  current: number;
  content: IMovie[];
}) => (
  <CarouselItem
    genres={genres}
    current={{ index: current, isRight: true }}
    content={content}
  />
);

interface CarouselProps {
  genres: IIdName[] | undefined;
}

const Carousel = ({ genres }: CarouselProps) => {
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
        <CarouselControls onNext={nextSlide} onPrev={prevSlide} />
      </div>
    </QueryWrapper>
  );
};

export default Carousel;
