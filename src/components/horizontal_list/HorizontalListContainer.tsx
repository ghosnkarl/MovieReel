import { useEffect, useRef, useState } from 'react';
import ListArrows from './ListArrows';
import Section from '../Section';
import HeaderLink from '../HeaderLink';

interface ListProps {
  title: string;
  children: React.ReactNode;
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
        {!link && (
          <h1 className='section__title section__title--list'>{title}</h1>
        )}
        {link && <HeaderLink link={link} linkState={linkState} title={title} />}
        <ListArrows listRef={ref} />
      </div>

      <ul ref={listRef} className='horizontal-list__container'>
        {children}
      </ul>
    </Section>
  );
};

export default HorizontalListContainer;
