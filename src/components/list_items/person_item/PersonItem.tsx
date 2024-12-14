import { NavLink } from 'react-router-dom';
import classes from './PersonItem.module.css';
import { getProfileImage } from '../../../helpers/imageSizes';
import { PERSON_TYPE } from '../../../helpers/constants';

interface IPersonItem {
  id: number;
  profile_path: string | null;
  title: string;
  text: string | null;
}

const PersonItem = ({ id, profile_path, title, text }: IPersonItem) => {
  return (
    <NavLink to={`/${PERSON_TYPE}/${id}`} className={classes.container}>
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
