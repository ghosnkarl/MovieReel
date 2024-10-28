import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./images-page.module.css";
import { IoArrowBack } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImagesPage = () => {
  const location = useLocation();
  const { title, image, images } = location.state;
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div onClick={() => navigate(-1)} className={classes.header}>
        <img src={image} alt={title} />
        <div>
          <h1 className={classes["movie-title"]}>{title}</h1>
          <p>
            <IoArrowBack />
            Back to main
          </p>
        </div>
      </div>

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
