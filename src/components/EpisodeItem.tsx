import moment from 'moment';
import { getBackdropImage } from '../helpers/imageSizes';
import { IEpisode } from '../models/seasonModel';
import classes from '../styles/episode-item.module.css';
import RatingStar from './rating/RatingStar';

const EpisodeItem = ({ episode }: { episode: IEpisode }) => {
  return (
    <div className={classes.container}>
      <img
        src={getBackdropImage(episode.still_path, 'w780')}
        alt={episode.name}
        className={classes.image}
      />
      <div>
        <h1 className={classes.title}>
          S{episode.season_number}.E{episode.episode_number} - {episode.name}
        </h1>
        <RatingStar value={episode.vote_average} size='small' />
        <p className={classes.date}>
          {moment(episode.air_date).format('MMM DD, YYYY')} • {episode.runtime}m
        </p>
        <p className={classes.overview}>{episode.overview}</p>
      </div>
    </div>
  );
};
export default EpisodeItem;
