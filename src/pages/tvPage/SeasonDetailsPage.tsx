import { useLocation } from 'react-router-dom';
import classes from './SeasonDetailsPage.module.css';
import useSeasonDetails from '@/hooks/useSeasonDetails';
import Rating from '@/components/rating/Rating';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { tmdbImage } from '@/helpers/imageSizes';
import { format } from '@/helpers/format';
import { IEpisode } from '@/models/seasonModel';

const EpisodeItem = ({ episode }: { episode: IEpisode }) => {
  return (
    <div className={classes.itemContainer}>
      <img
        src={tmdbImage.backdrop(episode.still_path, 'w780')}
        alt={episode.name}
        className={classes.backdrop}
      />
      <div className={classes.textContainer}>
        <h2 className={classes.title}>
          {String(episode.episode_number).padStart(2, '0')}. {episode.name}
        </h2>
        <p className={classes.overview}>{episode.overview}</p>
        <div className={classes.detailsContainer}>
          <Rating rating={episode.vote_average} />
          <p className={classes.runtime}>
            <AiOutlineClockCircle />
            {format.date(episode.air_date)}
          </p>
          <p className={classes.runtime}>
            <AiOutlineCalendar />
            {episode.runtime}m
          </p>
        </div>
      </div>
    </div>
  );
};

const SeasonDetailsPage = () => {
  const location = useLocation();
  const splitPath = location.pathname.split('/');

  const tvId = splitPath[2];
  const seasonNumber = splitPath[4];

  const { data } = useSeasonDetails({ tvId, seasonNumber });

  if (!data) return;

  return (
    <div>
      <h1 className='sectionTitle'>{data.name}</h1>
      <p className={classes.seasonOverview}>{data.overview}</p>
      <ul className={classes.episodes}>
        {data.episodes.map((episode) => (
          <EpisodeItem key={episode.id} episode={episode} />
        ))}
      </ul>
    </div>
  );
};
export default SeasonDetailsPage;
