import classes from './DetailsPage.module.css';
import RecommendedList from '../../components/lists/RecommendedList';
import { IDetails } from '../../models/detailsModel';
import HorizontalList from '../../components/horizontal_list/HorizontalList';
import DetailsMedia from './DetailsMedia';
import Keywords from '../../components/lists/keywords_list/KeywordsList';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleResult } from '../../services/http';
import { ICollectionDetails } from '../../models/commonModel';
import { MOVIE_TYPE, TV_TYPE } from '../../helpers/constants';

interface IDetailsMainContainer {
  media: IDetails;
}

const DetailsMain = ({ media }: IDetailsMainContainer) => {
  const isMovie = 'title' in media;
  const title = media.title || media.name;

  const collectionId = media?.belongs_to_collection?.id || null;

  const collectionQuery = useQuery<ICollectionDetails>({
    queryKey: ['collection', collectionId],
    queryFn: () =>
      fetchSingleResult<ICollectionDetails>({
        path: `collection/${collectionId}`,
        params: null,
      }),
    retry: 1,
    enabled: Boolean(collectionId),
  });

  const collectionList = collectionQuery.data;

  return (
    <div className={classes['details__main']}>
      <div className={classes['details__container']}>
        <DetailsMedia
          status={media.status}
          homepage={media.homepage}
          imdb_id={media.imdb_id}
          revenue={media.revenue}
          budget={media.budget}
          number_of_episodes={media.number_of_episodes}
          number_of_seasons={media.number_of_seasons}
          first_air_date={media.first_air_date}
          last_air_date={media.last_air_date}
          created_by={media.created_by}
          production_companies={media.production_companies}
        />

        <Keywords
          keywords={isMovie ? media.keywords.keywords : media.keywords.results}
        />
      </div>
      {/* {seasons && (
        <HorizontalList title='Seasons' link={null} linkState={null}>
          <MediaList
            data={seasons.sort((a, b) => b.season_number - a.season_number)}
            type='season'
          />
        </HorizontalList>
      )} */}

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
