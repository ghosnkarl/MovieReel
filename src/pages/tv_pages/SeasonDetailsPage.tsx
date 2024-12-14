import { useLocation } from 'react-router-dom';
import EpisodeItem from '../../components/list_items/episode_item/EpisodeItem';
import useSeasonDetails from '../../hooks/useSeasonDetails';

const SeasonDetailsPage = () => {
  const location = useLocation();
  const splitPath = location.pathname.split('/');

  const tvId = splitPath[2];
  const seasonNumber = splitPath[4];

  const { data } = useSeasonDetails({ tvId, seasonNumber });

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
