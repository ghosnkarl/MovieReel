import { NavLink } from "react-router-dom";
import classes from "../details_components/cast/cast-item.module.css";
import MotionDiv from "../ui/MotionDiv";

interface ListItemProps {
  link: string;
  image: string;
  title: string;
  text: string;
}

const ListItem = ({ link, image, title, text }: ListItemProps) => {
  return (
    <MotionDiv>
      <NavLink to={link} className={classes.container}>
        <img alt={title} src={image} />
        <h2>{title}</h2>
        <p>{text}</p>
      </NavLink>
    </MotionDiv>
  );
};
export default ListItem;
