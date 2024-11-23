import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import classes from '../../styles/movie-details.module.css';
import DetailsHeader from '../../components/details_components/DetailsHeader';
import QueryWrapper from '../../components/QueryWrapper';
import DetailsMainContainer from '../../components/details_components/DetailsMainContainer';

import { IMovieDetails } from '../../models/movieModel';
import { getBackdropImage } from '../../helpers/imageSizes';

const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;
  const queryParams = {
    append_to_response:
      'credits,images,videos,keywords,reviews,recommendations',
    include_image_language: 'en,null',
  };

  const movieQuery = useQuery({
    queryKey: ['movies', movieId],
    queryFn: () =>
      fetchSingleResult({ path: `movie/${movieId}`, params: queryParams }),
    retry: 0,
  });

  const movie = movieQuery.data as IMovieDetails;

  let content = <></>;
  if (movie) {
    content = (
      <>
        <img
          className={classes['backdrop__img']}
          src={getBackdropImage(movie.backdrop_path, 'w1280')}
          alt={movie.title}
        />
        <DetailsHeader
          title={movie.title}
          overview={movie.overview}
          genres={movie.genres}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
          release_date={movie.release_date}
          runtime={movie.runtime}
        />

        <DetailsMainContainer media={movie} />
      </>
    );
  }

  return (
    <div className={classes['page-container']}>
      <QueryWrapper query={movieQuery} message='Movie Details'>
        {content}
      </QueryWrapper>
    </div>
  );
};

export default MovieDetails;
