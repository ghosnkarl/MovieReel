import moment from "moment";
import classes from "./details-header.module.css";

import { GenreInterface } from "../../../models/genreModel";
import RatingStar from "../../rating/RatingStar";

interface DetailsHeaderProps {
  title: string;
  release_date: string;
  runtime: number;
  genres: GenreInterface[];
  vote_average: number;
  overview: string;
}

const DetailsHeader = ({
  title,
  release_date,
  runtime,
  genres,
  vote_average,
  overview,
}: DetailsHeaderProps) => {
  return (
    <div className={classes.header}>
      <p className={classes["header__genres"]}>
        {genres.map((genre) => genre.name).join(" • ")}
      </p>
      <h1 className={classes["header__title"]}>{title}</h1>
      <div className={classes["header__details"]}>
        <RatingStar value={vote_average} size="medium" />
        <p className={classes["header__date"]}>
          {moment(release_date).format("MMM DD, YYYY")}
          {runtime !== 0 && (
            <>
              {" • "}
              <span>
                {Math.floor(runtime / 60)}h {runtime % 60}m
              </span>
            </>
          )}
        </p>
      </div>
      <p className={classes["header__overview"]}>{overview}</p>
    </div>
  );
};

export default DetailsHeader;
