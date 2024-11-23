import moment from 'moment';
import { IMovie, ITVShow } from '../../models/mediaModel';
import MediaItem from '../MediaItem';

const MediaList = ({
  data,
  type,
}: {
  data: IMovie[] | ITVShow[] | undefined;
  type: 'movies' | 'tv';
}) => {
  return (
    <>
      {data &&
        data.map((item) => {
          const title = 'title' in item ? item.title : item.name;
          const date =
            'title' in item ? item.release_date : item.first_air_date;
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
