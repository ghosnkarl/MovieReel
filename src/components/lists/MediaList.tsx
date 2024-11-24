import moment from 'moment';
import { IMovie, ITVShow } from '../../models/mediaModel';
import { ISeason } from '../../models/seasonModel';
import { NavLink } from 'react-router-dom';
import classes from '../../styles/media-item.module.css';
import { getPosterImage } from '../../helpers/imageSizes';

type MediaType = 'movies' | 'tv' | 'season';

interface IMediaItem {
  text: string;
  id: number;
  poster_path: string | null;
  title: string | undefined;
  type: MediaType;
}

const MediaItem = ({ text, id, poster_path, title, type }: IMediaItem) => {
  const link = type === 'season' ? `seasons/${id}` : `/${type}/${id}`;
  return (
    <NavLink
      to={link}
      className={classes['container__link']}
      state={{ title, image: getPosterImage(poster_path, 'w342') }}
    >
      <div className={classes['container']}>
        <div className={classes['img-container']}>
          <img src={getPosterImage(poster_path, 'w342')} alt={title} />
        </div>
        <div className={classes['text-container']}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </NavLink>
  );
};

const MediaList = ({
  data,
  type,
}: {
  data: IMovie[] | ITVShow[] | ISeason[] | undefined;
  type: MediaType;
}) => {
  if (!data) return null;

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
            id={item.id}
            title={title}
            type={type}
            poster_path={item.poster_path}
            text={moment(date).format('MMM DD, YYYY')}
          />
        );
      })}
    </>
  );
};

export default MediaList;
