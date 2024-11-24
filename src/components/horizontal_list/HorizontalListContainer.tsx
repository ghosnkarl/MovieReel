import { useEffect, useRef, useState } from 'react';
import ListArrows from './ListArrows';
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
    <div>
      <div className='list-header'>
        {!link ? (
          <h1 className='section__title section__title--list'>{title}</h1>
        ) : (
          <HeaderLink link={link} linkState={linkState} title={title} />
        )}

        <ListArrows listRef={ref} />
      </div>

      <ul ref={listRef} className='horizontal-list__container'>
        {children}
      </ul>
    </div>
  );
};

export default HorizontalListContainer;
