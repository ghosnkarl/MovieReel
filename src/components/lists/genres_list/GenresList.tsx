import { IIdName } from '../../../models/commonModel';
import classes from './GenresList.module.css';

const GenresList = ({ genres }: { genres: IIdName[] }) => {
  return (
    <ul className={classes.genres__list}>
      {genres.map((genre) => (
        <li key={genre.id} className={classes.genres__item}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenresList;
