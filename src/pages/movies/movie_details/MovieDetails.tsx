import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchGenres, fetchMovieDetails } from '../../../services/http';
import { getBackdropImage, getPosterImage } from '../../../helpers/imageSizes';
import classes from './movie-details.module.css';
import CastList from '../../../components/details_components/CastList';
import { getGalleryImages } from '../../../helpers/galleryImages';
import ScrollToTop from '../../../components/ui/ScrollToTop';
import DetailsHeader from '../../../components/details_components/DetailsHeader';
import VideoList from '../../../components/details_components/VideoList';
import ImageList from '../../../components/details_components/ImageList';
import RecommendedList from '../../../components/details_components/RecommendedList';
import MediaDetails from '../../../components/details_components/MediaDetails';
import DetailsReviews from '../../../components/details_components/DetailsReviews';
import QueryWrapper from '../../../components/QueryWrapper';
import Keywords from '../../../components/Keywords';

const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;

  const movieQuery = useQuery({
    queryKey: ['movies', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    retry: 0,
  });

  const movie = movieQuery.data;

  const genresResult = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  let content = <></>;
  if (movie) {
    const images = getGalleryImages({ images: movie.images });
    content = (
      <>
        <img
          className={classes['backdrop-img']}
          src={getBackdropImage(movie.backdrop_path, 'w1280')}
          alt={movie.title}
        />
        <DetailsHeader
          title={movie.title}
          overview={movie.overview}
          genres={movie.genres}
          vote_average={movie.vote_average}
          release_date={movie.release_date}
          runtime={movie.runtime}
        />
        <div className={classes['details-container']}>
          <div className={classes['main-container']}>
            {movie.credits && (
              <CastList
                title={movie.title}
                image={getPosterImage(movieQuery.data.poster_path, 'w342')}
                credits={movieQuery.data.credits}
              />
            )}

            {movie.videos.results && movie.videos.results.length > 0 && (
              <VideoList videos={movieQuery.data.videos.results} />
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
          <div className={classes['side__container']}>
            <MediaDetails
              status={movie.status}
              homepage={movie.homepage}
              imdb_id={movie.imdb_id}
              production_companies={movie.production_companies}
              revenue={movie.revenue}
              budget={movie.budget}
              tagline={movie.tagline}
              collection={movie.belongs_to_collection}
            />
            <Keywords keywords={movie.keywords.keywords} />

            <DetailsReviews
              reviews={movie.reviews}
              title={movie.title}
              poster_path={movie.poster_path}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <ScrollToTop>
      <div className={classes['page-container']}>
        <QueryWrapper query={movieQuery} message='Movie Details'>
          {content}
        </QueryWrapper>
      </div>
    </ScrollToTop>
  );
};

export default MovieDetails;
