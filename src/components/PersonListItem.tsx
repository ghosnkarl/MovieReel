import { NavLink } from 'react-router-dom';
import classes from '../styles/people-item.module.css';
import { getProfileImage } from '../helpers/imageSizes';

interface PersonListItemProps {
  id: number;
  profile_path: string;
  title: string;
  text: string | null;
}

const PersonListItem = ({
  id,
  profile_path,
  title,
  text,
}: PersonListItemProps) => {
  return (
    <NavLink
      key={id}
      to={`/people/${id}`}
      className={classes['container__link']}
    >
      <div className={classes.container}>
        <div className={classes['img-container']}>
          <img src={getProfileImage(profile_path, 'w185')} alt={title} />
        </div>
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
      </div>
    </NavLink>
  );
};

export default PersonListItem;
