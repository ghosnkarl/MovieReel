import { NavLink } from 'react-router-dom';
import MotionDiv from './ui/MotionDiv';
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
    <MotionDiv>
      <NavLink key={id} to={`/people/${id}`} className={classes.container}>
        <img src={getProfileImage(profile_path, 'w185')} alt={title} />
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
      </NavLink>
    </MotionDiv>
  );
};

export default PersonListItem;
