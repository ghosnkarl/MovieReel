import { Swiper, SwiperSlide } from 'swiper/react';
import useDiscoverMovies from '../../hooks/useDiscoverMovies';
import CarouselItem from './CarouselItem';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import classes from './CarouselItem.module.css';
import ErrorBlock from '../ui/error_block/ErrorBlock';
import LoadingIndicator from '../ui/LoadingIndicator';
import useGenres from '../../hooks/useGenres';
import { nowPlayingDates } from '../../helpers/discoverHelpers';

const Carousel = () => {
  const { data: genres } = useGenres({ type: 'movie' });
  const { data, isError, isLoading, refetch } = useDiscoverMovies({
    params: nowPlayingDates,
  });

  if (isLoading) return <LoadingIndicator />;

  if (isError || !data)
    return (
      <ErrorBlock
        onTryAgainClick={refetch}
        message='There was an error fetching now playing movies.'
      />
    );

  return (
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
      navigation={true}
      className={classes.swiper}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <CarouselItem
            genres={genres}
            item={item}
            type='normal'
            media_type='movies'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
