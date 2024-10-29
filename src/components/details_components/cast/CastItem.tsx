import { NavLink } from "react-router-dom";
import classes from "../cast/cast-item.module.css";

interface CastItemProps {
  link: string;
  image: string;
  title: string;
  text: string;
}

const CastItem = ({ link, image, title, text }: CastItemProps) => {
  return (
    <NavLink to={link} className={classes["actor-link"]}>
      <div className={classes.container}>
        <img alt={title} src={image} />
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </NavLink>
  );
};
export default CastItem;
