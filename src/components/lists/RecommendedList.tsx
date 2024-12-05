import { IMovie, ITVShow } from '../../models/mediaModel';
import HorizontalList from '../horizontal_list/HorizontalList';

interface IRecommendedList {
  items: IMovie[] | ITVShow[];
  title: string;
  type: 'movies' | 'tv';
}

const RecommendedList = ({ items, title, type }: IRecommendedList) => {
  if (items && items.length === 0) return null;
  return (
    <HorizontalList
      title={`If you like ${title}, check out`}
      link={null}
      linkState={null}
      data={items}
      type={type === 'movies' ? 'movie' : 'tvShows'}
    />
  );
};

export default RecommendedList;
