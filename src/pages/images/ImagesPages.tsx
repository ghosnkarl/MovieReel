import { NavLink, useLocation } from "react-router-dom";
import classes from "./images-page.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImagesPage = () => {
  const location = useLocation();
  const { images } = location.state;

  return (
    <div>
      <div className={classes["images-container"]}>
        {images.map((image: { galleryImage: string; fullImage: string }) => (
          <NavLink
            key={image.galleryImage}
            to={image.fullImage}
            target="_blank"
          >
            <LazyLoadImage src={image.galleryImage} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ImagesPage;
