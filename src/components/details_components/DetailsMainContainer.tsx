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
  const title = 'title' in media ? media.title : media.name;
  return (
    <div className={classes['main-container']}>
      {media.credits && (
        <CastList
          title={title}
          image={getPosterImage(media.poster_path, 'w342')}
          credits={media.credits}
        />
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
