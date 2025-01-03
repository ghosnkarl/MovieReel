import HeaderLink from '@/components/ui/headerLink/HeaderLink';
import classes from '@/components/horizontalList/HorizontalList.module.css';
import { IPeople } from '@/models/peopleModel';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MediaItem } from '@/components/lists/mediaList/MediaList';
import PersonItem from '@/components/personItem/PersonItem';
import { motion } from 'framer-motion';
import {
  DataType,
  QueryData,
} from '@/components/horizontalList/HorizontalWrapper';
import { useRef, useState } from 'react';
import { NavigationOptions, Swiper as SwiperType } from 'swiper/types';
import { IMedia } from '@/models/mediaModel';
import { ISeason } from '@/models/seasonModel';
import { tmdbImage } from '@/helpers/imageSizes';
import { format } from '@/helpers/format';
import { MediaType } from '@/helpers/constants';

interface HorizontalListProps {
  title: string;
  linkState: unknown;
  link: string | null;
  data: QueryData[];
  type: DataType;
}

const HorizontalList = ({
  title,
  linkState,
  link,
  data,
  type,
}: HorizontalListProps) => {
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
  const renderSlide = (item: IMedia | IPeople | ISeason) => {
    if (type === MediaType.MOVIE || type === MediaType.TV) {
      const media = item as IMedia;
      return (
        <SwiperSlide key={media.id}>
          <MediaItem
            id={media.id}
            title={media.title || media.name}
            poster_path={media.poster_path}
            text={
              media.release_date
                ? format.date(media.release_date)
                : format.date(media.first_air_date)
            }
            type={type}
          />
        </SwiperSlide>
      );
    }

    if (type === MediaType.PERSON) {
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

    if (type === 'season') {
      const season = item as ISeason;
      return (
        <SwiperSlide key={season.id}>
          <MediaItem
            id={season.season_number}
            text={format.date(season.air_date)}
            title={season.name}
            poster_path={tmdbImage.poster(season.poster_path, 'w342')}
            type='season'
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
        {data && data.length > 6 && (
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
          slidesPerView={3}
          slidesPerGroup={3}
          spaceBetween={15}
          loop={false}
          allowTouchMove={true}
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
          breakpoints={{
            600: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            992: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1200: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            1400: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
          }}
        >
          {data && data.map(renderSlide)}
        </Swiper>
      </div>
    </div>
  );
};

export default HorizontalList;
