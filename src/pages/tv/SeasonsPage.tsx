import { NavLink, useLocation } from 'react-router-dom';
import { ISeason } from '../../models/tvModel';
import classes from '../../styles/seasons-page.module.css';
import { getPosterImage } from '../../helpers/imageSizes';
import RatingStar from '../../components/rating/RatingStar';
import moment from 'moment';

const SeasonsPage = () => {
  const location = useLocation();
  const seasons = location.state.seasons as ISeason[];
  return (
    <ul className={classes.container}>
      {seasons.map((season) => (
        <NavLink
          className={classes['season__link']}
          to={`${season.season_number}`}
          state={{
            title: season.name,
            image: getPosterImage(season.poster_path, 'w342'),
          }}
        >
          <li key={season.id}>
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
          </li>
        </NavLink>
      ))}
    </ul>
  );
};

export default SeasonsPage;
