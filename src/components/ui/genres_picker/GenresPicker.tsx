import classes from './GenresPicker.module.css';
import { useState } from 'react';
import { IIdName } from '../../../models/commonModel';
import useGenres from '../../../hooks/useGenres';

const GenresPicker = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const { data, isLoading, isError } = useGenres({ type: 'movie' });

  const handleGenreClicked = (genre: IIdName) => {
    if (!selectedGenres.find((id) => genre.id === id)) {
      setSelectedGenres([...selectedGenres, genre.id]);
    } else {
      const newList = selectedGenres.filter((id) => genre.id !== id);
      setSelectedGenres(newList);
    }
  };

  if (isLoading || isError || !data) return;

  return (
    <div className={classes['genres-container']}>
      {data.map((genre) => (
        <span
          className={`${
            selectedGenres.find((id) => id == genre.id) ? classes.active : ''
          }`}
          onClick={() => handleGenreClicked(genre)}
          key={genre.name}
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};
export default GenresPicker;
