import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import classes from './CarouselCoverflow.module.css';
import { IMedia } from '../../models/mediaModel';
import CarouselItem from '../carousel/CarouselItem';
import useGenres from '../../hooks/useGenres';
import { MediaType } from '../../helpers/constants';

interface ICarouselCoverflow {
  data: IMedia[];
  media_type: MediaType;
}

const CarouselCoverflow = ({ data, media_type }: ICarouselCoverflow) => {
  const { data: genres } = useGenres({ type: media_type });
  const title = media_type === 'movie' ? 'Movies' : 'TV Shows';
  return (
    <>
      <h1 className='section__title'>Trending {title}</h1>
      <Swiper
        effect={'coverflow'}
        allowTouchMove={false}
        className='customSwiper'
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {data.map((item) => (
          <SwiperSlide className={classes['swiper__slide']} key={item.id}>
            <CarouselItem
              genres={genres}
              item={item}
              type='coverflow'
              media_type={media_type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselCoverflow;
