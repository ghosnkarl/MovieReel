import { NavLink } from 'react-router-dom';
import classes from './CreditItem.module.css';
import { PERSON_TYPE } from '../../../helpers/constants';
import { tmdbImage } from '../../../helpers/imageSizes';

interface ICreditItem {
  id: number | string;
  profile_path: string;
  title: string;
  text: string | null;
}

const CreditItem = ({ id, profile_path, title, text }: ICreditItem) => {
  return (
    <NavLink
      key={id}
      to={`/${PERSON_TYPE}/${id}`}
      className={classes.container}
    >
      <div className={classes['img__container']}>
        <img
          className={classes['profile__img']}
          src={tmdbImage.profile(profile_path, 'h632')}
          alt={title}
        />
      </div>
      <div className={classes['text__container']}>
        <h2 className={classes.title}>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </NavLink>
  );
};

export default CreditItem;
