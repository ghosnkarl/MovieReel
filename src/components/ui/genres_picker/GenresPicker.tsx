import { useQuery } from '@tanstack/react-query';
import classes from './GenresPicker.module.css';
import { useState } from 'react';
import { fetchGenres } from '../../../services/http';
import { IIdName } from '../../../models/commonModel';

const GenresPicker = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const genresQuery = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const handleGenreClicked = (genre: IIdName) => {
    if (!selectedGenres.find((id) => genre.id === id)) {
      setSelectedGenres([...selectedGenres, genre.id]);
    } else {
      const newList = selectedGenres.filter((id) => genre.id !== id);
      setSelectedGenres(newList);
    }
  };

  if (genresQuery.isLoading || genresQuery.isError) return;

  const genres = genresQuery.data!;

  return (
    <div className={classes['genres-container']}>
      {genres.map((genre) => (
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
