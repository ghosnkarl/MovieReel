import { getGalleryImages } from '../../helpers/galleryImages';
import classes from '../../styles/details-page.module.css';
import VideoList from './VideoList';
import ImageList from './ImageList';
import RecommendedList from './RecommendedList';
import { getPosterImage } from '../../helpers/imageSizes';
import CastList from './CastList';
import { IMovieDetails } from '../../models/movieModel';
import { ITVDetails } from '../../models/tvModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import MediaItem from '../MediaItem';
import DetailsReviews from './DetailsReviews';
import MediaDetails from './MediaDetails';
import Keywords from '../Keywords';

const DetailsMainContainer = ({
  media,
}: {
  media: IMovieDetails | ITVDetails;
}) => {
  const images = getGalleryImages({ images: media.images });
  const isMovie = 'title' in media;
  const title = isMovie ? media.title : media.name;
  const credits = isMovie ? media.credits : media.aggregate_credits;
  const seasons = isMovie ? null : media.seasons;

  return (
    <div className={classes['main-container']}>
      {credits && (
        <CastList
          title={title}
          image={getPosterImage(media.poster_path, 'w342')}
          credits={credits}
        />
      )}

      {seasons && (
        <HorizontalListContainer title='Seasons' link={null} linkState={null}>
          {seasons
            .sort((a, b) => b.season_number - a.season_number)
            .map((season) => (
              <MediaItem
                key={season.id}
                id={season.season_number}
                poster_path={season.poster_path}
                title={season.name}
                text={`${season.episode_count} Episodes`}
                type='season'
              />
            ))}
        </HorizontalListContainer>
      )}

      {media.videos.results && media.videos.results.length > 0 && (
        <VideoList videos={media.videos.results} />
      )}

      <div className={classes['side__container']}>
        <MediaDetails
          status={media.status}
          homepage={media.homepage}
          imdb_id={media.imdb_id}
          revenue={media.revenue}
          budget={media.budget}
          tagline={media.tagline}
          collection={isMovie ? media.belongs_to_collection : null}
          number_of_episodes={isMovie ? null : media.number_of_episodes}
          number_of_seasons={isMovie ? null : media.number_of_seasons}
          first_air_date={isMovie ? null : media.first_air_date}
          last_air_date={isMovie ? null : media.last_air_date}
          created_by={isMovie ? null : media.created_by}
          production_companies={isMovie ? media.production_companies : null}
        />

        <Keywords
          keywords={isMovie ? media.keywords.keywords : media.keywords.results}
        />
      </div>
      <DetailsReviews
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

      <RecommendedList title={title} items={media.recommendations.results} />
    </div>
  );
};

export default DetailsMainContainer;
