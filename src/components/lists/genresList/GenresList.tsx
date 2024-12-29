import { IBaseIdName } from '@/models/commonModel';
import classes from '@/components/lists/genresList/GenresList.module.css';

const GenresList = ({ genres }: { genres: IBaseIdName[] }) => {
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
