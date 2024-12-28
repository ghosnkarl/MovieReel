import classes from './DetailsPage.module.css';
import RecommendedList from '../../components/lists/RecommendedList';
import { IDetails } from '../../models/detailsModel';
import HorizontalList from '../../components/horizontalList/HorizontalList';
import DetailsMedia from './DetailsMedia';
import useCollectionDetails from '../../hooks/useCollectionDetails';
import { MediaType } from '../../helpers/constants';

const DetailsMain = ({ media }: { media: IDetails }) => {
  const isMovie = 'title' in media;
  const title = media.title || media.name;

  const collectionId = media?.belongs_to_collection?.id || null;
  const { data: collectionList } = useCollectionDetails({ collectionId });

  return (
    <div className={classes.detailsMain}>
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
          type={MediaType.MOVIE}
        />
      )}

      <RecommendedList
        title={title}
        items={media.recommendations.results}
        type={isMovie ? MediaType.MOVIE : MediaType.TV}
      />
    </div>
  );
};

export default DetailsMain;
