import { NavLink } from 'react-router-dom';
import { CastInterface, CrewInterface } from '../../../models/mediaModel';
import classes from './cast.module.css';
import { getProfileImage } from '../../../helpers/imageSizes';
import { useEffect, useRef, useState } from 'react';
import ListArrows from '../../horizontal_list/arrows/ListArrows';

import { IoArrowForwardCircle } from 'react-icons/io5';
import Section from '../../section/Section';

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
  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);

  return (
    <Section>
      <div className='list-header'>
        <NavLink
          to='cast'
          state={{ title, image, credits }}
          className='section-link'
        >
          Actors
          <IoArrowForwardCircle className='list__header--icon' />
        </NavLink>
        <ListArrows listRef={ref} />
      </div>
      <ul ref={listRef} className={classes.cast}>
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
      </ul>
    </Section>
  );
};

export default CastList;
