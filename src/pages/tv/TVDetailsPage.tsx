import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import classes from '../../styles/movie-details.module.css';
import DetailsHeader from '../../components/details_components/DetailsHeader';
import QueryWrapper from '../../components/QueryWrapper';

const TVDetailsPage = () => {
  const params = useParams();
  const tvShowId = params.tvId;
  const queryParams = {
    append_to_response:
      'credits,images,videos,keywords,reviews,recommendations,similar',
    include_image_language: 'en,null',
  };

  const movieQuery = useQuery({
    queryKey: ['movies', tvShowId],
    queryFn: () =>
      fetchSingleResult({ path: `tv/${tvShowId}`, params: queryParams }),
    retry: 0,
  });

  const tvShow = movieQuery.data;

  let content = <></>;
  if (tvShow) {
    content = (
      <>
        <DetailsHeader
          title={tvShow.name}
          overview={tvShow.overview}
          genres={tvShow.genres}
          vote_average={tvShow.vote_average}
          release_date={tvShow.release_date}
          runtime={tvShow.runtime}
          backdrop_path={tvShow.backdrop_path}
        />
        {/* <div className={classes['details-container']}>
          <DetailsMainContainer movie={movie} />
          <SideDetailsContainer movie={movie} />
        </div> */}
      </>
    );
  }

  return (
    <div className={classes['page-container']}>
      <QueryWrapper query={movieQuery} message='TV Details'>
        {content}
      </QueryWrapper>
    </div>
  );
};

export default TVDetailsPage;
