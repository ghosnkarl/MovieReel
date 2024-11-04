import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../../services/http';
import { getBackdropImage } from '../../../helpers/imageSizes';
import classes from './movie-details.module.css';
import ScrollToTop from '../../../components/ui/ScrollToTop';
import DetailsHeader from '../../../components/details_components/DetailsHeader';
import QueryWrapper from '../../../components/QueryWrapper';
import DetailsMainContainer from '../../../components/details_components/DetailsMainContainer';
import SideDetailsContainer from '../../../components/details_components/SideDetailsContainer';

const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;

  const movieQuery = useQuery({
    queryKey: ['movies', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    retry: 0,
  });

  const movie = movieQuery.data;

  let content = <></>;
  if (movie) {
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
          <DetailsMainContainer movie={movie} />
          <SideDetailsContainer movie={movie} />
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
