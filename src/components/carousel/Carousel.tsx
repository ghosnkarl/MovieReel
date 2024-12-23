import { Swiper, SwiperSlide } from 'swiper/react';
import useDiscover from '../../hooks/useDiscover';
import CarouselItem from './CarouselItem';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import classes from './CarouselItem.module.css';
import LoadingIndicator from '../ui/LoadingIndicator';
import useGenres from '../../hooks/useGenres';
import { nowPlayingDates } from '../../helpers/discoverHelpers';
import { MOVIE_TYPE } from '../../helpers/constants';
import ErrorComponent from '../ui/error_component/ErrorComponent';

const Carousel = () => {
  const { data: genres } = useGenres({ type: MOVIE_TYPE });
  const { data, isError, isLoading, refetch } = useDiscover({
    mediaType: MOVIE_TYPE,
    params: nowPlayingDates,
  });

  if (isLoading) return <LoadingIndicator />;

  if (isError || !data) return <ErrorComponent onRetry={refetch} />;

  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      allowTouchMove={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      navigation={true}
      className={classes.swiper}
    >
      {data.results.map((item) => (
        <SwiperSlide key={item.id}>
          <CarouselItem genres={genres} item={item} media_type={MOVIE_TYPE} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
