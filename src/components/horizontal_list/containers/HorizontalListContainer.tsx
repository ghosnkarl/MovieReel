import { NavLink } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import ListArrows from '../../horizontal_list/arrows/ListArrows';

import { IoArrowForwardCircle } from 'react-icons/io5';
import Section from '../../section/Section';

interface ListProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  linkState: unknown;
  link: string | null;
}

const HorizontalListContainer = ({
  title,
  linkState,
  children,
  link,
}: ListProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);

  return (
    <Section border='left'>
      <div className='list-header'>
        {link && (
          <NavLink to={link} state={linkState} className='section-link'>
            {title}
            <IoArrowForwardCircle className='list__header--icon' />
          </NavLink>
        )}
        {!link && <h1 className='homepage-title'>{title}</h1>}
        <ListArrows listRef={ref} />
      </div>

      <ul ref={listRef} className='horizontal-list__container'>
        {children}
      </ul>
    </Section>
  );
};

export default HorizontalListContainer;
