import { getBackdropImage } from '../../../helpers/imageSizes';
import { IEpisode } from '../../../models/seasonModel';
import classes from './EpisodeItem.module.css';

import { formatDate } from '../../../helpers/commonHelpers';
import Rating from '../../rating/Rating';

const EpisodeItem = ({ episode }: { episode: IEpisode }) => {
  return (
    <div className={classes.container}>
      <img
        src={getBackdropImage(episode.still_path, 'w780')}
        alt={episode.name}
        className={classes.backdrop}
      />
      <div>
        <h1 className={classes.title}>
          S{episode.season_number}.E{episode.episode_number} - {episode.name}
        </h1>
        <Rating rating={episode.vote_average} />
        <p className={classes.date}>
          {formatDate(episode.air_date)} • {episode.runtime}m
        </p>
        <p className={classes.overview}>{episode.overview}</p>
      </div>
    </div>
  );
};
export default EpisodeItem;
