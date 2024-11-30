import { getGalleryImages } from '../../helpers/galleryImages';
import classes from './DetailsPage.module.css';
import VideoList from '../../components/lists/video_list/VideoList';
import ImageList from '../../components/lists/image_list/ImageList';
import RecommendedList from '../../components/lists/RecommendedList';
import { getPosterImage } from '../../helpers/imageSizes';
import CastList from '../../components/lists/CastList';
import { IMovieDetails, ITVDetails } from '../../models/detailsModel';
import HorizontalList from '../../components/horizontal_list/HorizontalList';
import DetailsMedia from './DetailsMedia';
import Keywords from '../../components/lists/keywords_list/KeywordsList';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleResult } from '../../services/http';
import { ICollectionDetails } from '../../models/commonModel';
import MediaList from '../../components/lists/media_list/MediaList';
import ProductionCompanies from '../../components/lists/production_companies/ProductionCompanies';
import ReviewsList from '../../components/lists/reviews_list/ReviewsList';

interface IDetailsMainContainer {
  media: IMovieDetails | ITVDetails;
}

const DetailsMain = ({ media }: IDetailsMainContainer) => {
  const images = getGalleryImages({ images: media.images });
  const isMovie = 'title' in media;
  const title = isMovie ? media.title : media.name;
  const seasons = isMovie ? null : media.seasons;
  const collectionId = isMovie ? media?.belongs_to_collection?.id : null;

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
    <div className={classes['main-container']}>
      <CastList
        title={title}
        image={getPosterImage(media.poster_path, 'w342')}
        credits={isMovie ? media.credits : media.aggregate_credits}
      />

      {seasons && (
        <HorizontalList title='Seasons' link={null} linkState={null}>
          <MediaList
            data={seasons.sort((a, b) => b.season_number - a.season_number)}
            type='season'
          />
        </HorizontalList>
      )}

      <VideoList videos={media.videos.results} />

      <div className={classes['details__container']}>
        <DetailsMedia
          status={media.status}
          homepage={media.homepage}
          imdb_id={isMovie ? media.imdb_id : null}
          revenue={isMovie ? media.revenue : null}
          budget={isMovie ? media.budget : null}
          tagline={media.tagline}
          number_of_episodes={isMovie ? null : media.number_of_episodes}
          number_of_seasons={isMovie ? null : media.number_of_seasons}
          first_air_date={isMovie ? null : media.first_air_date}
          last_air_date={isMovie ? null : media.last_air_date}
          created_by={isMovie ? null : media.created_by}
        />

        <Keywords
          keywords={isMovie ? media.keywords.keywords : media.keywords.results}
        />
      </div>
      <ProductionCompanies production_companies={media.production_companies} />
      <ReviewsList
        reviews={media.reviews}
        title={isMovie ? media.title : media.name}
        poster_path={media.poster_path}
      />

      <ImageList
        images={images}
        backdropList={media.images.backdrops}
        title={title}
        image={getPosterImage(media.poster_path, 'w342')}
      />

      {collectionList && (
        <HorizontalList
          title={collectionList.name}
          link={null}
          linkState={null}
        >
          <MediaList data={collectionList.parts} type='movies' />
        </HorizontalList>
      )}

      <RecommendedList
        title={title}
        items={media.recommendations.results}
        type={isMovie ? 'movies' : 'tv'}
      />
    </div>
  );
};

export default DetailsMain;