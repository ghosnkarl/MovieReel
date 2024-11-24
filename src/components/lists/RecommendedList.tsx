import { IMovie, ITVShow } from '../../models/mediaModel';

import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';

import MediaList from './MediaList';

const RecommendedList = ({
  items,
  title,
  type,
}: {
  items: IMovie[] | ITVShow[];
  title: string;
  type: 'movies' | 'tv';
}) => {
  return (
    <div>
      {items && items.length > 0 && (
        <HorizontalListContainer
          title={`If you like ${title}, check out`}
          link={null}
          linkState={null}
        >
          <MediaList data={items} type={type} />
        </HorizontalListContainer>
      )}
    </div>
  );
};

export default RecommendedList;
