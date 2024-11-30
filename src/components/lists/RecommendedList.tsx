import { IMovie, ITVShow } from '../../models/mediaModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import MediaList from './media_list/MediaList';

interface IRecommendedList {
  items: IMovie[] | ITVShow[];
  title: string;
  type: 'movies' | 'tv';
}

const RecommendedList = ({ items, title, type }: IRecommendedList) => {
  if (items && items.length === 0) return null;
  return (
    <HorizontalListContainer
      title={`If you like ${title}, check out`}
      link={null}
      linkState={null}
    >
      <MediaList data={items} type={type} />
    </HorizontalListContainer>
  );
};

export default RecommendedList;
