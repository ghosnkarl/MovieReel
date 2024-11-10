import { NavLink } from 'react-router-dom';
import classes from '../../styles/recommended-list.module.css';
import { getBackdropImage } from '../../helpers/imageSizes';
import { IMovie } from '../../models/mediaModel';
import { IGenre } from '../../models/genreModel';
import Section from '../Section';
import { ITV } from '../../models/tvModel';

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
          <h1 className='section__title'>If you like {title}, check out</h1>
          <ul className={classes.container}>
            {items.map((item) => {
              let genres = '';
              const title = 'title' in item ? item.title : item.name;
              if (genreList)
                genres = item.genre_ids
                  .map(
                    (genreID) =>
                      genreList?.find((genre) => genre.id === genreID)?.name
                  )
                  .join(' • ');
              return (
                <RecommendedListItem
                  backdrop={item.backdrop_path}
                  title={title}
                  overview={item.overview}
                  genres={genres}
                  key={item.id}
                  id={item.id}
                  type={'title' in item ? 'movies' : 'tv'}
                />
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default RecommendedList;
