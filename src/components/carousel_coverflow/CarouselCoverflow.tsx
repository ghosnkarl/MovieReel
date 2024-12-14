import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import classes from './CarouselCoverflow.module.css';
import { IMedia } from '../../models/mediaModel';
import useGenres from '../../hooks/useGenres';
import { MediaType } from '../../helpers/constants';
import { getPosterImage } from '../../helpers/imageSizes';
import { formatDate, getGenres } from '../../helpers/commonHelpers';
import RatingStar from '../rating/RatingStar';
import { NavLink } from 'react-router-dom';

interface IMovieCarouselItem {
  item: IMedia;
  genres: string;
  mediaType: MediaType;
}

const MovieCarouselItem = ({ item, genres, mediaType }: IMovieCarouselItem) => {
  return (
    <NavLink
      to={`/${mediaType}/${item.id}`}
      className={classes['carousel-item']}
    >
      <img
        src={getPosterImage(item.poster_path, 'w342')}
        alt={item.title || item.name}
        className={classes['carousel-item-poster']}
      />
      <div>
        <h2 className={classes['carousel-item-title']}>
          {item.title || item.name}
        </h2>
        <div className={classes['carousel-item-genres']}>{genres}</div>
        <div className={classes['carousel-item-meta']}>
          <RatingStar
            value={item.vote_average}
            size='small'
            vote_count={item.vote_count}
          />
          <span className={classes['carousel-item-release']}>
            {formatDate(item.release_date || item.first_air_date)}
          </span>
        </div>

        <p className={classes['carousel-item-description']}>{item.overview}</p>
      </div>
    </NavLink>
  );
};

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
          depth: 0,
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
            <MovieCarouselItem
              genres={getGenres(item.genre_ids, genres)}
              item={item}
              mediaType={media_type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselCoverflow;
