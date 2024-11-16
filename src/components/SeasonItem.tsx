import { ISeason } from '../models/tvModel';
import { getPosterImage } from '../helpers/imageSizes';
import RatingStar from '../components/rating/RatingStar';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import classes from '../styles/seasons-page.module.css';

interface ISeasonItem {
  season: ISeason;
  isListItem: boolean;
}

const SeasonItem = ({ season, isListItem }: ISeasonItem) => {
  const link = !isListItem
    ? `seasons/${season.season_number}`
    : `${season.season_number}`;
  return (
    <NavLink
      className={classes['season__link']}
      to={link}
      state={{
        title: season.name,
        image: getPosterImage(season.poster_path, 'w342'),
      }}
    >
      <div
        className={`${classes['item__container']} ${
          isListItem ? classes['item__container--list'] : ''
        }`}
      >
        <img
          className={classes['season__img']}
          src={getPosterImage(season.poster_path, 'w500')}
          alt={season.name}
        />
        <div className={classes['season__text']}>
          <div>
            <h1 className={classes['season__title']}>
              {season.season_number} - {season.name}
            </h1>
            <p className={classes['season__episodes']}>
              ({season.episode_count} Episodes)
            </p>
          </div>
          <RatingStar value={season.vote_average} size='small' />

          <p className={classes['season__date']}>
            Premiered on {moment(season.air_date).format('MMM DD, YYYY')}
          </p>
          <p className={classes['season__overview']}>{season.overview}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default SeasonItem;
