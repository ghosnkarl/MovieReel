import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import classes from '../../styles/movie-details.module.css';
import DetailsHeader from '../../components/details_components/DetailsHeader';
import QueryWrapper from '../../components/QueryWrapper';
import DetailsMainContainer from '../../components/details_components/DetailsMainContainer';
import SideDetailsContainer from '../../components/details_components/SideDetailsContainer';

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

  const movie = movieQuery.data;

  let content = <></>;
  if (movie) {
    content = (
      <>
        <DetailsHeader
          title={movie.title}
          overview={movie.overview}
          genres={movie.genres}
          vote_average={movie.vote_average}
          release_date={movie.release_date}
          runtime={movie.runtime}
          backdrop_path={movie.backdrop_path}
        />
        <div className={classes['details-container']}>
          <DetailsMainContainer movie={movie} />
          <SideDetailsContainer movie={movie} />
        </div>
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
