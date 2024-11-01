import { NavLink } from 'react-router-dom';
import classes from '../../styles/cast.module.css';
import MotionDiv from '../ui/MotionDiv';

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
