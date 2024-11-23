import { useLocation } from 'react-router-dom';
import { ISeason } from '../../models/tvModel';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleResult } from '../../services/http';
import EpisodeItem from '../../components/EpisodeItem';

const SeasonDetailsPage = () => {
  const location = useLocation();
  const splitPath = location.pathname.split('/');

  const tvId = splitPath[2];
  const seasonNumber = splitPath[4];

  const seasonQuery = useQuery({
    queryKey: ['season', seasonNumber],
    queryFn: () =>
      fetchSingleResult({
        path: `tv/${tvId}/season/${seasonNumber}`,
        params: null,
      }),
    retry: 1,
  });

  // const { episodes } = location.state;

  return (
    <>
      {seasonQuery.data ? (
        <ul>
          {(seasonQuery.data as ISeason).episodes.map((episode) => (
            <EpisodeItem key={episode.id} episode={episode} />
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
export default SeasonDetailsPage;
