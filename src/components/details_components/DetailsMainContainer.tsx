import { getGalleryImages } from '../../helpers/galleryImages';
import classes from '../../styles/movie-details.module.css';
import VideoList from './VideoList';
import ImageList from './ImageList';
import RecommendedList from './RecommendedList';
import { getPosterImage } from '../../helpers/imageSizes';
import CastList from './CastList';
import { IMovieDetails } from '../../models/movieModel';
import { ITVDetails } from '../../models/tvModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import MediaItem from '../MediaItem';
import SideDetailsContainer from './SideDetailsContainer';
import DetailsReviews from './DetailsReviews';

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

      <SideDetailsContainer media={media} />

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
