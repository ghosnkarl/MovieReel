import classes from './DetailsPage.module.css';
import RecommendedList from '../../components/lists/RecommendedList';
import { IDetails } from '../../models/detailsModel';
import HorizontalList from '../../components/horizontalList/HorizontalList';
import DetailsMedia from './DetailsMedia';
import { MOVIE_TYPE, TV_TYPE } from '../../helpers/constants';
import useCollectionDetails from '../../hooks/useCollectionDetails';

interface IDetailsMainContainer {
  media: IDetails;
}

const DetailsMain = ({ media }: IDetailsMainContainer) => {
  const isMovie = 'title' in media;
  const title = media.title || media.name;

  const collectionId = media?.belongs_to_collection?.id || null;
  const { data: collectionList } = useCollectionDetails({ collectionId });

  return (
    <div className={classes['details__main']}>
      <DetailsMedia media={media} />

      {media.seasons && (
        <HorizontalList
          title='Seasons'
          link={null}
          linkState={null}
          data={media.seasons}
          type='season'
        />
      )}

      {collectionList && (
        <HorizontalList
          title={collectionList.name}
          link={null}
          linkState={null}
          data={collectionList.parts}
          type={MOVIE_TYPE}
        />
      )}

      <RecommendedList
        title={title}
        items={media.recommendations.results}
        type={isMovie ? MOVIE_TYPE : TV_TYPE}
      />
    </div>
  );
};

export default DetailsMain;
