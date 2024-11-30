import { useLocation } from 'react-router-dom';
import { ISeason } from '../../models/seasonModel';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleResult } from '../../services/http';
import EpisodeItem from '../../components/list_items/episode_item/EpisodeItem';

const SeasonDetailsPage = () => {
  const location = useLocation();
  const splitPath = location.pathname.split('/');

  const tvId = splitPath[2];
  const seasonNumber = splitPath[4];

  const { data } = useQuery<ISeason>({
    queryKey: ['season', seasonNumber],
    queryFn: () =>
      fetchSingleResult<ISeason>({
        path: `tv/${tvId}/season/${seasonNumber}`,
        params: null,
      }),
    retry: 1,
  });

  if (!data) return;

  return (
    <ul>
      {data.episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} />
      ))}
    </ul>
  );
};
export default SeasonDetailsPage;
