import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import classes from '../../styles/movie-details.module.css';
import DetailsHeader from '../../components/details_components/DetailsHeader';
import QueryWrapper from '../../components/QueryWrapper';
import { ITVDetails } from '../../models/tvModel';
import DetailsMainContainer from '../../components/details_components/DetailsMainContainer';
import SideDetailsContainer from '../../components/details_components/SideDetailsContainer';

const TVDetailsPage = () => {
  const params = useParams();
  const tvShowId = params.tvId;
  const queryParams = {
    append_to_response:
      'aggregate_credits,images,videos,keywords,reviews,recommendations',
    include_image_language: 'en,null',
  };

  const tvQuery = useQuery({
    queryKey: ['movies', tvShowId],
    queryFn: () =>
      fetchSingleResult({ path: `tv/${tvShowId}`, params: queryParams }),
    retry: 0,
  });

  const tvShow = tvQuery.data as ITVDetails;

  let content = <></>;
  if (tvShow) {
    content = (
      <>
        <DetailsHeader
          title={tvShow.name}
          overview={tvShow.overview}
          genres={tvShow.genres}
          vote_average={tvShow.vote_average}
          release_date={null}
          runtime={tvShow.runtime}
          backdrop_path={tvShow.backdrop_path}
          poster_path={tvShow.poster_path}
        />
        <div className={classes['details-container']}>
          <DetailsMainContainer media={tvShow} />
          {/* <SideDetailsContainer media={tvShow} /> */}
        </div>
      </>
    );
  }

  return (
    <div className={classes['page-container']}>
      <QueryWrapper query={tvQuery} message='TV Details'>
        {content}
      </QueryWrapper>
    </div>
  );
};

export default TVDetailsPage;
