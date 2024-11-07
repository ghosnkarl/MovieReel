import moment from 'moment';
import { IMovie, ITVShow } from '../../models/mediaModel';
import MediaItem from '../MediaItem';

const MediaList = ({
  data,
  type,
}: {
  data: IMovie[] | ITVShow[];
  type: 'movies' | 'tv';
}) => {
  return (
    <>
      {data.map((item) => {
        const title = 'title' in item ? item.title : item.name;
        return (
          <MediaItem
            key={item.id}
            id={item.id}
            title={title}
            type={type}
            poster_path={item.poster_path}
            text={moment(item.release_date).format('MMM DD, YYYY')}
            vote_average={item.vote_average}
          />
        );
      })}
    </>
  );
};

export default MediaList;
