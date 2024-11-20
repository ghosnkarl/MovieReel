import { useQuery } from '@tanstack/react-query';
import { getGalleryImages } from '../../helpers/galleryImages';
import classes from '../../styles/movie-details.module.css';
import { fetchGenres } from '../../services/http';
import VideoList from './VideoList';
import ImageList from './ImageList';
import RecommendedList from './RecommendedList';
import { getPosterImage } from '../../helpers/imageSizes';
import CastList from './CastList';
import { IMovieDetails } from '../../models/movieModel';
import { ITVDetails } from '../../models/tvModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import MediaItem from '../MediaItem';

const DetailsMainContainer = ({
  media,
}: {
  media: IMovieDetails | ITVDetails;
}) => {
  const genresResult = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const images = getGalleryImages({ images: media.images });
  const isMovie = 'title' in media;
  const title = isMovie ? media.title : media.name;
  const credits = isMovie ? media.credits : media.aggregate_credits;
  const seasons = isMovie ? null : media.seasons;
  const number_of_seasons = isMovie ? null : media.number_of_seasons;

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
        <HorizontalListContainer
          title='Seasons'
          link='seasons'
          linkState={{
            title,
            number_of_seasons,
            seasons,
            image: getPosterImage(media.poster_path, 'w342'),
          }}
        >
          {seasons.map((season) => (
            <MediaItem
              key={season.id}
              id={season.id}
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

      <ImageList
        images={images}
        backdropList={media.images.backdrops}
        title={title}
        image={getPosterImage(media.poster_path, 'w342')}
      />

      <RecommendedList
        title={title}
        items={media.recommendations.results}
        genreList={genresResult.data}
      />
    </div>
  );
};

export default DetailsMainContainer;
