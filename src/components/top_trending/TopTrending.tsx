import { useQuery } from "@tanstack/react-query";
import { getBackdropImage, getPosterImage } from "../../helpers/imageSizes";

import { fetchTrendingMovies, fetchTrendingTV } from "../../services/http";
import classes from "./top-trending.module.css";
import moment from "moment";
import RatingStar from "../rating/RatingStar";

const TopTrending = ({ type }: { type: "movie" | "tv" }) => {
  const { data, isError, error, refetch } = useQuery({
    queryKey: [type, "trending"],
    queryFn: () =>
      type === "movie" ? fetchTrendingMovies("week") : fetchTrendingTV("week"),
    retry: 1,
  });

  let content = <></>;
  if (data) {
    const list = data.slice(1, 5);
    content = (
      <>
        <div>
          <div className={classes["container--left"]}>
            <img src={getBackdropImage(data[0].backdrop_path, "w780")} />
            <h1>{data[0].title || data[0].name}</h1>
          </div>
        </div>
        <ul className={classes["container--right"]}>
          {list.map((listItem) => (
            <li className={classes["item-container"]} key={listItem.id}>
              <img src={getPosterImage(listItem.poster_path, "w185")} />

              <div className={classes["item-container--right"]}>
                <h1>{listItem.title || listItem.name}</h1>
                <RatingStar value={listItem.vote_average} size="small" />
                <p className={classes.date}>
                  {moment(listItem.release_date).format("MMM DD, YYYY")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div>
      <h1 className="homepage-title">
        Top 5 {type === "movie" ? "Movies" : "TV Shows"} of the Week
      </h1>
      <div className={classes.container}>{content}</div>
    </div>
  );
};

export default TopTrending;
