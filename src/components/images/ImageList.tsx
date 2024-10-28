import { NavLink } from "react-router-dom";
import { getBackdropImage } from "../../helpers/imageSizes";
import classes from "./image-list.module.css";
import { IoChevronForward } from "react-icons/io5";

const ImageList = ({
  backdropList,
  title,
  images,
  image,
}: {
  backdropList: { file_path: string }[];
  title: string;
  images: { galleryImage: string; fullImage: string }[];
  image: string;
}) => {
  return (
    <div>
      <NavLink
        state={{ images, title, image }}
        to="images"
        className="section-link"
      >
        Images
        <IoChevronForward />
      </NavLink>

      <div className={classes["images-container"]}>
        {backdropList.map((backdrop) => (
          <img
            key={backdrop.file_path}
            src={getBackdropImage(backdrop.file_path, "w780")}
            alt={title}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageList;
