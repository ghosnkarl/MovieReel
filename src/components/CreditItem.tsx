import { NavLink } from 'react-router-dom';
import classes from '../styles/credits-item.module.css';
import { getProfileImage } from '../helpers/imageSizes';

interface CreditItemProps {
  id: number;
  profile_path: string;
  title: string;
  text: string | null;
}

const CreditItem = ({ id, profile_path, title, text }: CreditItemProps) => {
  return (
    <NavLink key={id} to={`/people/${id}`} className={classes.container}>
      <img src={getProfileImage(profile_path, 'w185')} alt={title} />
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </NavLink>
  );
};

export default CreditItem;
