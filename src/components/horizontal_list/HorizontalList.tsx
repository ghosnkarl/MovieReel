import HeaderLink from '../ui/header_link/HeaderLink';
import classes from './HorizontalList.module.css';
import { IMovie, ITVShow } from '../../models/mediaModel';
import { IPeople } from '../../models/peopleModel';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MediaItem } from '../lists/media_list/MediaList';
import { formatDate } from '../../helpers/commonHelpers';
import PersonItem from '../list_items/person_item/PersonItem';
import { motion } from 'framer-motion';
import { DataType, QueryData } from './HorizontalWrapper';
import { useRef, useState } from 'react';
import { NavigationOptions, Swiper as SwiperType } from 'swiper/types';

interface IHorizontalList {
  title: string;
  linkState: unknown;
  link: string | null;
  data: QueryData;
  type: DataType;
}

const HorizontalList = ({
  title,
  linkState,
  link,
  data,
  type,
}: IHorizontalList) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Handle Swiper Slide Change
  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Create a generic slide component
  const renderSlide = (item: IMovie | ITVShow | IPeople) => {
    if (type === 'movie') {
      const movie = item as IMovie;
      return (
        <SwiperSlide key={movie.id}>
          <MediaItem
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            text={formatDate(movie.release_date)}
            type='movies'
          />
        </SwiperSlide>
      );
    }

    if (type === 'tvShows') {
      const tv = item as ITVShow;
      return (
        <SwiperSlide key={tv.id}>
          <MediaItem
            id={tv.id}
            title={tv.name}
            poster_path={tv.poster_path}
            text={formatDate(tv.first_air_date)}
            type='tv'
          />
        </SwiperSlide>
      );
    }

    if (type === 'people') {
      const person = item as IPeople;
      return (
        <SwiperSlide key={person.id}>
          <PersonItem
            id={person.id}
            text={null}
            title={person.name}
            profile_path={person.profile_path}
          />
        </SwiperSlide>
      );
    }

    return null;
  };

  // This function is necessary to set the buttons as custom navigation
  const initSwiperNavigation = (swiper: SwiperType) => {
    if (swiper.params && swiper.params.navigation) {
      (swiper.params.navigation as NavigationOptions).prevEl =
        navigationPrevRef.current;
      (swiper.params.navigation as NavigationOptions).nextEl =
        navigationNextRef.current;
    }

    if (swiper.navigation) {
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  return (
    <div>
      <div className={classes.header}>
        {!link ? (
          <h1 className={classes.title}>{title}</h1>
        ) : (
          <HeaderLink link={link} linkState={linkState} title={title} />
        )}
        {data.length > 5 && (
          <div className='arrows__container'>
            <motion.button
              whileHover={{
                scale: 1.2,
              }}
              className={`arrowLeft ${isBeginning ? 'disabled' : ''}`}
              ref={navigationPrevRef}
            >
              <MdNavigateBefore />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.2,
              }}
              className={`arrowRight ${isEnd ? 'disabled' : ''}`}
              ref={navigationNextRef}
            >
              <MdNavigateNext />
            </motion.button>
          </div>
        )}
      </div>
      <div>
        <Swiper
          slidesPerView={type === 'people' ? 7 : 5}
          spaceBetween={15}
          slidesPerGroup={5}
          loop={false}
          allowTouchMove={false}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            renderBullet: (_index: number, className: string) => {
              return `<span class="${className} linePagination"></span>`;
            },
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={initSwiperNavigation}
          onSlideChange={handleSlideChange}
          className='customSwiper'
        >
          {data.map(renderSlide)}
        </Swiper>
      </div>
    </div>
  );
};

export default HorizontalList;
