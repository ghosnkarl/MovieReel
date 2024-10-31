import { NavLink } from 'react-router-dom';
import { CastInterface, CrewInterface } from '../../../models/mediaModel';
import classes from './cast.module.css';
import { getProfileImage } from '../../../helpers/imageSizes';
import HorizontalListContainer from '../../horizontal_list/containers/HorizontalListContainer';

interface CastItemProps {
  link: string;
  image: string;
  title: string;
  text: string;
}

const CastItem = ({ link, image, title, text }: CastItemProps) => {
  return (
    <NavLink to={link} className={classes['cast__item']}>
      <img className={classes['cast__item--profile']} alt={title} src={image} />
      <div>
        <h2 className={classes['cast__item--name']}>{title}</h2>
        <p className={classes['cast__item--character']}>{text}</p>
      </div>
    </NavLink>
  );
};

interface CastListProps {
  title: string;
  image: string;
  credits: { cast: CastInterface[]; crew: CrewInterface[] };
}

const CastList = ({ title, image, credits }: CastListProps) => {
  let castList = [...credits.cast];
  if (castList.length > 20) castList = castList.slice(0, 20);

  return (
    <HorizontalListContainer
      link='cast'
      linkState={{ title, image, credits }}
      title='Actors'
    >
      {castList.map((cast) => (
        <li key={cast.credit_id}>
          <CastItem
            link={`/people/${cast.id}`}
            image={getProfileImage(cast.profile_path, 'w185')}
            title={cast.name}
            text={cast.character}
          />
        </li>
      ))}
    </HorizontalListContainer>
  );
};

export default CastList;
