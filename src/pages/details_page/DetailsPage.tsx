import { useParams } from 'react-router-dom';
import classes from './DetailsPage.module.css';
import DetailsHeader from './details_header/DetailsHeader';
import DetailsMain from './DetailsMain';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import useDetails from '../../hooks/useDetails';

const DetailsPage = ({ isMovie }: { isMovie: boolean }) => {
  const params = useParams();
  const id = params.movieId || params.tvId;

  const { data, isLoading, isError } = useDetails({ id, isMovie });

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  return (
    <div className={classes['page-container']}>
      <DetailsHeader
        title={'title' in data ? data.title : data.name}
        overview={data.overview}
        genres={data.genres}
        vote_average={data.vote_average}
        release_date={'title' in data ? data.release_date : null}
        runtime={'title' in data ? data.runtime : null}
        backdrop_path={data.backdrop_path}
        vote_count={data.vote_count}
      />

      <DetailsMain media={data} />
    </div>
  );
};

export default DetailsPage;
