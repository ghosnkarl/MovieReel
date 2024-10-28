import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../services/http";
import classes from "./genres-picker.module.css";
import { GenreInterface } from "../../models/genreModel";
import { useState } from "react";

const GenresPicker = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const { data, isError, error, refetch } = useQuery({
    queryKey: ["genres", "movie"],
    queryFn: () => fetchGenres("movie"),
    retry: 1,
  });

  const handleGenreClicked = (genre: GenreInterface) => {
    if (!selectedGenres.find((id) => genre.id === id)) {
      setSelectedGenres([...selectedGenres, genre.id]);
    } else {
      const newList = selectedGenres.filter((id) => genre.id !== id);
      setSelectedGenres(newList);
    }
  };

  return (
    <>
      {data && (
        <div className={classes["genres-container"]}>
          {data.map((genre) => (
            <span
              className={`${
                selectedGenres.find((id) => id == genre.id)
                  ? classes.active
                  : ""
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
  );
};
export default GenresPicker;
