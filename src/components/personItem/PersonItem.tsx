import { NavLink } from 'react-router-dom';
import classes from './PersonItem.module.css';
import { PERSON_TYPE } from '../../helpers/constants';
import { tmdbImage } from '../../helpers/imageSizes';

interface IPersonItem {
  id: number;
  profile_path: string | null;
  title: string;
  text: string | null;
}

const PersonItem = ({ id, profile_path, title, text }: IPersonItem) => {
  return (
    <NavLink to={`/${PERSON_TYPE}/${id}`} className={classes.container}>
      <div className={classes.imgContainer}>
        <img
          className={classes.img}
          src={tmdbImage.profile(profile_path, 'w185')}
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
