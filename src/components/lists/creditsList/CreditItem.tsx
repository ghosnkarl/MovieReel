import { NavLink } from 'react-router-dom';
import classes from '@/components/lists/creditsList/CreditItem.module.css';
import { tmdbImage } from '@/helpers/imageSizes';
import { MediaType } from '@/helpers/constants';

interface CreditItemProps {
  id: number | string;
  profile_path: string;
  title: string;
  text: string | null;
}

const CreditItem = ({ id, profile_path, title, text }: CreditItemProps) => {
  return (
    <NavLink
      key={id}
      to={`/${MediaType.PERSON}/${id}`}
      className={classes.container}
    >
      <div className={classes.imgContainer}>
        <img
          className={classes.profileImg}
          src={tmdbImage.profile(profile_path, 'h632')}
          alt={title}
        />
      </div>
      <div className={classes.textContainer}>
        <h2 className={classes.title}>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </NavLink>
  );
};

export default CreditItem;
