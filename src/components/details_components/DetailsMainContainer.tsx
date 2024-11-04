import { useQuery } from '@tanstack/react-query';
import { getGalleryImages } from '../../helpers/galleryImages';
import classes from '../../styles/movie-details.module.css';
import { fetchGenres } from '../../services/http';
import VideoList from './VideoList';
import ImageList from './ImageList';
import RecommendedList from './RecommendedList';
import { getPosterImage } from '../../helpers/imageSizes';
import { MovieDetailsInterface } from '../../models/mediaModel';
import CastList from './CastList';

const DetailsMainContainer = ({ movie }: { movie: MovieDetailsInterface }) => {
  const genresResult = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const images = getGalleryImages({ images: movie.images });
  return (
    <div className={classes['main-container']}>
      {movie.credits && (
        <CastList
          title={movie.title}
          image={getPosterImage(movie.poster_path, 'w342')}
          credits={movie.credits}
        />
      )}

      {movie.videos.results && movie.videos.results.length > 0 && (
        <VideoList videos={movie.videos.results} />
      )}

      <ImageList
        images={images}
        backdropList={movie.images.backdrops}
        title={movie.title}
        image={getPosterImage(movie.poster_path, 'w342')}
      />

      <RecommendedList
        title={movie.title}
        items={movie.recommendations.results}
        genreList={genresResult.data}
      />
    </div>
  );
};

export default DetailsMainContainer;
