import { getPosterImage } from '../../helpers/imageSizes';
import { IMovie } from '../../models/mediaModel';
import Section from '../Section';
import { ITV } from '../../models/seasonModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import MediaItem from '../MediaItem';
import moment from 'moment';

const RecommendedList = ({
  items,
  title,
}: {
  items: IMovie[] | ITV[];
  title: string;
}) => {
  return (
    <>
      {items && items.length > 0 && (
        <Section border='left'>
          <HorizontalListContainer
            title={`If you like ${title}, check out`}
            link={null}
            linkState={null}
          >
            {items.map((item) => (
              <MediaItem
                key={item.id}
                id={item.id}
                poster_path={getPosterImage(item.poster_path, 'w342')}
                type={'title' in item ? 'movies' : 'tv'}
                title={'title' in item ? item.title : item.name}
                text={moment(
                  'title' in item ? item.release_date : item.first_air_date
                ).format('MMM DD, YYYY')}
              />
            ))}
          </HorizontalListContainer>
        </Section>
      )}
    </>
  );
};

export default RecommendedList;
