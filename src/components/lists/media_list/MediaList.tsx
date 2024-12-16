import { ISeason } from '../../../models/seasonModel';
import { NavLink } from 'react-router-dom';
import classes from './MediaItem.module.css';
import { IMedia } from '../../../models/mediaModel';
import { MediaType } from '../../../helpers/constants';
import { tmdbImage } from '../../../helpers/imageSizes';
import { format } from '../../../helpers/format';

type MediaTypeSeason = MediaType | 'season';

interface IMediaItem {
  text: string;
  id: number;
  poster_path: string | null;
  title: string | undefined;
  type: MediaTypeSeason;
}

export const MediaItem = ({
  text,
  id,
  poster_path,
  title,
  type,
}: IMediaItem) => {
  const link = type === 'season' ? `seasons/${id}` : `/${type}/${id}`;
  return (
    <NavLink
      to={link}
      className={classes['link__wrapper']}
      state={{ title, image: tmdbImage.poster(poster_path, 'w342') }}
    >
      <div className={classes.container}>
        <div className={classes['img__container']}>
          <img
            className={classes.poster}
            src={tmdbImage.poster(poster_path, 'w342')}
            alt={title}
          />
        </div>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.text}>{text}</p>
      </div>
    </NavLink>
  );
};

interface IMediaList {
  data: IMedia[] | ISeason[] | undefined;
  type: MediaType;
}

const MediaList = ({ data, type }: IMediaList) => {
  if (!data || data.length === 0) return;

  return (
    <>
      {data.map((item) => {
        const title = 'title' in item ? item.title : item.name;
        let date = null;
        if ('title' in item) date = item.release_date;
        if ('first_air_date' in item) date = item.first_air_date;
        if ('air_date' in item) date = item.air_date;
        return (
          <MediaItem
            key={item.id}
            id={'air_date' in item ? item.season_number : item.id}
            title={title}
            type={type}
            poster_path={item.poster_path}
            text={format.date(date)}
          />
        );
      })}
    </>
  );
};

export default MediaList;
