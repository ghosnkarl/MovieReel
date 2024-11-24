import { NavLink } from 'react-router-dom';
import classes from '../styles/people-item.module.css';
import { getProfileImage } from '../helpers/imageSizes';

interface IPersonItem {
  id: number;
  profile_path: string;
  title: string;
  text: string | null;
}

const PersonItem = ({ id, profile_path, title, text }: IPersonItem) => {
  return (
    <NavLink to={`/people/${id}`} className={classes.container}>
      <div className={classes['img-container']}>
        <img
          className={classes.img}
          src={getProfileImage(profile_path, 'w185')}
          alt={title}
        />
      </div>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </NavLink>
  );
};

export default PersonItem;
