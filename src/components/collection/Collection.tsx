import { NavLink } from "react-router-dom";
import { getBackdropImage, getPosterImage } from "../../helpers/imageSizes";
import { CollectionInterface } from "../../models/mediaModel";
import classes from "./collection.module.css";

const Collection = ({ collection }: { collection: CollectionInterface }) => {
  return (
    <div className={classes.container}>
      <div className={classes["image-overlay"]} />
      <img
        className={classes["backdrop-img"]}
        src={getBackdropImage(collection.backdrop_path, "w780")}
        alt={collection.name}
      />

      <div className={classes["details-container"]}>
        <img
          src={getPosterImage(collection.poster_path, "w342")}
          className={classes["poster-img"]}
          alt={collection.name}
        />
        <div>
          <h1>Part of the {collection.name}</h1>
          <NavLink className={classes.discover} to="/">
            View Collection
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Collection;
