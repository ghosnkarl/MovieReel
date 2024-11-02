import { NavLink } from 'react-router-dom';
import classes from '../../styles/media-item.module.css';
import { MediaListInterface } from '../../models/mediaModel';
import moment from 'moment';
import { getPosterImage } from '../../helpers/imageSizes';
import MotionDiv from '../ui/MotionDiv';
import Rating from '../rating/Rating';

const MediaList = ({
  data,
  type,
}: {
  data: MediaListInterface[];
  type: 'movies' | 'tv';
}) => {
  return (
    <>
      {data.map((item) => {
        const formattedStartTime = moment(item.release_date).format(
          'MMM DD, YYYY'
        );
        return (
          <MotionDiv key={item.id}>
            <NavLink
              to={`/${type}/${item.id}`}
              className={classes['container']}
            >
              <div className={classes['img-container']}>
                <img
                  src={getPosterImage(item.poster_path, 'w342')}
                  alt={item.title || item.name}
                />

                <div className={classes['rating-container']}>
                  <Rating
                    value={(item.vote_average * 10).toFixed(0)}
                    size='small'
                  />
                </div>
              </div>
              <div className={classes['text-container']}>
                <h2>{item.title || item.name}</h2>
                <p>{formattedStartTime}</p>
              </div>
            </NavLink>
          </MotionDiv>
        );
      })}
    </>
  );
};

export default MediaList;
