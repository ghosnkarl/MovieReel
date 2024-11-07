import moment from 'moment';
import { IMedia } from '../../models/mediaModel';
import MediaItem from '../MediaItem';

const MediaList = ({
  data,
  type,
}: {
  data: IMedia[];
  type: 'movies' | 'tv';
}) => {
  return (
    <>
      {data.map((item) => (
        <MediaItem
          key={item.id}
          id={item.id}
          title={item.title || item.name}
          type={type}
          poster_path={item.poster_path}
          text={moment(item.release_date).format('MMM DD, YYYY')}
          vote_average={item.vote_average}
        />
      ))}
    </>
  );
};

export default MediaList;
