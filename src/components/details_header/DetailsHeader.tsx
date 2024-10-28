import moment from "moment";
import classes from "./details-header.module.css";
import Overview from "../overview/Overview";
import { GenreInterface } from "../../models/genreModel";
import RatingStar from "../rating/RatingStar";

interface DetailsHeaderProps {
  title: string;
  release_date: string;
  runtime: number;
  genres: GenreInterface[];
  vote_average: number;
  tagline: string;
  overview: string;
}

const DetailsHeader = ({
  title,
  release_date,
  runtime,
  genres,
  vote_average,
  tagline,
  overview,
}: DetailsHeaderProps) => {
  return (
    <div className={classes.container}>
      <div className={classes["container--text"]}>
        <p className={classes.genres}>
          {genres.map((genre) => genre.name).join(" • ")}
        </p>
        <h1 className={classes.title}>{title}</h1>

        <div className={classes["header-container--rating"]}>
          <RatingStar value={vote_average} size="medium" />
          <p className={classes.date}>
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
        <Overview tagline={tagline} overview={overview} />
      </div>
    </div>
  );
};

export default DetailsHeader;
