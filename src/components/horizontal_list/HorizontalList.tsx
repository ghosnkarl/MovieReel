import HeaderLink from '../ui/header_link/HeaderLink';
import classes from './HorizontalList.module.css';
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
import { IMedia } from '../../models/mediaModel';
import { MOVIE_TYPE, TV_TYPE } from '../../helpers/constants';

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
  const renderSlide = (item: IMedia | IPeople) => {
    if (type === MOVIE_TYPE || type === TV_TYPE) {
      const media = item as IMedia;
      return (
        <SwiperSlide key={media.id}>
          <MediaItem
            id={media.id}
            title={media.title || media.name}
            poster_path={media.poster_path}
            text={
              media.release_date
                ? formatDate(media.release_date)
                : formatDate(media.first_air_date)
            }
            type={type}
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
        {data.length > 6 && (
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
          slidesPerView={type === 'people' ? 7 : 6}
          spaceBetween={15}
          slidesPerGroup={6}
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
