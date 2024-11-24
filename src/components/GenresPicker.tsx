import { useQuery } from '@tanstack/react-query';
import classes from '../styles/genres-picker.module.css';
import { useState } from 'react';
import { fetchGenres } from '../services/http';
import { IGenre } from '../models/genreModel';
import QueryWrapper from './QueryWrapper';

const GenresPicker = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const genresQuery = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const handleGenreClicked = (genre: IGenre) => {
    if (!selectedGenres.find((id) => genre.id === id)) {
      setSelectedGenres([...selectedGenres, genre.id]);
    } else {
      const newList = selectedGenres.filter((id) => genre.id !== id);
      setSelectedGenres(newList);
    }
  };

  return (
    <QueryWrapper query={genresQuery} message='Genres'>
      <>
        {genresQuery.data && (
          <div className={classes['genres-container']}>
            {genresQuery.data.map((genre: IGenre) => (
              <span
                className={`${
                  selectedGenres.find((id) => id == genre.id)
                    ? classes.active
                    : ''
                }`}
                onClick={() => handleGenreClicked(genre)}
                key={genre.name}
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </>
    </QueryWrapper>
  );
};
export default GenresPicker;
