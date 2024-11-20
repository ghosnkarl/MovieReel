import { NavLink } from 'react-router-dom';
import classes from '../../styles/recommended-list.module.css';
import { getBackdropImage, getPosterImage } from '../../helpers/imageSizes';
import { IMovie } from '../../models/mediaModel';
import { IGenre } from '../../models/genreModel';
import Section from '../Section';
import { ITV } from '../../models/tvModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import MediaItem from '../MediaItem';
import { it } from 'node:test';
import moment from 'moment';

interface RecommendedListItemProps {
  backdrop: string;
  title: string | undefined;
  overview: string;
  genres: string;
  id: number;
  type: 'movies' | 'tv';
}

const RecommendedListItem = ({
  backdrop,
  title,
  overview,
  genres,
  id,
  type,
}: RecommendedListItemProps) => {
  return (
    <NavLink to={`/${type}/${id}`} className={classes['item__container']}>
      <img
        className={classes['item__backdrop']}
        src={getBackdropImage(backdrop, 'w300')}
        alt={title}
      />
      <div className={classes['item__container--text']}>
        <h1 className={classes['item__title']}>{title}</h1>
        <p className={classes['item__overview']}>{overview}</p>
        <p className={classes['item__genres']}>{genres}</p>
      </div>
    </NavLink>
  );
};

const RecommendedList = ({
  items,
  title,
  genreList,
}: {
  items: IMovie[] | ITV[];
  title: string;
  genreList: IGenre[] | undefined;
}) => {
  return (
    <>
      {items && items.length > 0 && (
        <Section border='left'>
          <h1 className='section__title'></h1>
          <HorizontalListContainer
            title={`If you like ${title}, check out`}
            link={null}
            linkState={null}
          >
            {items.map((item) => (
              <MediaItem
                key={item.id}
                id={item.id}
                poster_path={getPosterImage(item.poster_path, 'w342')}
                type={'title' in item ? 'movies' : 'tv'}
                title={'title' in item ? item.title : item.name}
                text={moment(
                  'title' in item ? item.release_date : item.first_air_date
                ).format('MMM DD, YYYY')}
              />
            ))}
          </HorizontalListContainer>
        </Section>
      )}
    </>
  );
};

export default RecommendedList;
