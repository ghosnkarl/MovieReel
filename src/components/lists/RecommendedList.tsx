import { MediaType } from '../../helpers/constants';
import { IMedia } from '../../models/mediaModel';
import HorizontalList from '../horizontal_list/HorizontalList';

interface IRecommendedList {
  items: IMedia[];
  title: string | undefined;
  type: MediaType;
}

const RecommendedList = ({ items, title, type }: IRecommendedList) => {
  if (items && items.length === 0) return null;
  return (
    <HorizontalList
      title={`If you like ${title}, check out`}
      link={null}
      linkState={null}
      data={items}
      type={type}
    />
  );
};

export default RecommendedList;
