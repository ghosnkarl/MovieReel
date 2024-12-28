import { Swiper, SwiperSlide } from 'swiper/react';
import useDiscover from '../../hooks/useDiscover';
import CarouselItem from './CarouselItem';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import classes from './CarouselItem.module.css';
import useGenres from '../../hooks/useGenres';
import { nowPlayingDates } from '../../helpers/discoverHelpers';
import ErrorComponent from '../ui/errorComponent/ErrorComponent';
import { MediaType } from '../../helpers/constants';
import LoadingIndicator from '../ui/loadingSpinner/LoadingIndicator';

const Carousel = () => {
  const { data: genres } = useGenres({ type: MediaType.MOVIE });
  const { data, isError, isLoading, refetch } = useDiscover({
    mediaType: MediaType.MOVIE,
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
          <CarouselItem
            genres={genres}
            item={item}
            media_type={MediaType.MOVIE}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
