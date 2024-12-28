import { IIdName } from '../../../models/commonModel';
import classes from './GenresList.module.css';

const GenresList = ({ genres }: { genres: IIdName[] }) => {
  return (
    <ul className={classes.list}>
      {genres.map((genre) => (
        <li key={genre.id} className={classes.item}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenresList;
