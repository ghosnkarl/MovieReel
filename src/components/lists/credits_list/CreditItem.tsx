import { NavLink } from 'react-router-dom';
import classes from './CreditItem.module.css';
import { getProfileImage } from '../../../helpers/imageSizes';

interface ICreditItem {
  id: number | string;
  profile_path: string;
  title: string;
  text: string | null;
}

const CreditItem = ({ id, profile_path, title, text }: ICreditItem) => {
  return (
    <NavLink key={id} to={`/people/${id}`} className={classes.container}>
      <div className={classes['img__container']}>
        <img
          className={classes['profile__img']}
          src={getProfileImage(profile_path, 'w185')}
          alt={title}
        />
      </div>
      <div>
        <h2 className={classes.title}>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </NavLink>
  );
};

export default CreditItem;
