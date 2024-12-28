import classes from '@/components/ui/genresPicker/GenresPicker.module.css';
import { useState } from 'react';
import { IBaseIdName } from '@/models/commonModel';
import useGenres from '@/hooks/useGenres';

const GenresPicker = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const { data, isLoading, isError } = useGenres({ type: 'movie' });

  const handleGenreClicked = (genre: IBaseIdName) => {
    if (!selectedGenres.find((id) => genre.id === id)) {
      setSelectedGenres([...selectedGenres, genre.id]);
    } else {
      const newList = selectedGenres.filter((id) => genre.id !== id);
      setSelectedGenres(newList);
    }
  };

  if (isLoading || isError || !data) return;

  return (
    <div className={classes.genresContainer}>
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
