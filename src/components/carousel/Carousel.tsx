import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDiscoverMovies from '../../hooks/useDiscoverMovies';
import CarouselItem from './CarouselItem';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import classes from './CarouselItem.module.css';
import ErrorBlock from '../ui/error_block/ErrorBlock';
import LoadingIndicator from '../ui/LoadingIndicator';
import useGenres from '../../hooks/useGenres';

const Carousel = () => {
  const { data: genres } = useGenres({ type: 'movie' });
  const { data, isError, isLoading, refetch } = useDiscoverMovies();

  if (isLoading) return <LoadingIndicator />;

  if (isError || !data)
    return (
      <ErrorBlock
        onTryAgainClick={refetch}
        message='There was an error fetching now playing movies.'
      />
    );

  return (
    <div className='container-box'>
      <Swiper
        slidesPerView={1}
        loop={true}
        allowTouchMove={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className={classes.swiper}
        navigation={{
          nextEl: `.${classes.arrowRight}`,
          prevEl: `.${classes.arrowLeft}`,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <CarouselItem genres={genres} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={`${classes.arrowLeft}`}>
        <MdNavigateBefore />
      </button>
      <button className={`${classes.arrowRight}`}>
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Carousel;
