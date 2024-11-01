import { useEffect, useRef, useState } from 'react';
import ListArrows from '../../horizontal_list/arrows/ListArrows';
import Section from '../../section/Section';
import HeaderLink from '../../HeaderLink';

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
        {link && <HeaderLink title={title} link={link} linkState={linkState} />}
        {!link && <h1 className='section__title'>{title}</h1>}
        <ListArrows listRef={ref} />
      </div>

      <ul ref={listRef} className='horizontal-list__container'>
        {children}
      </ul>
    </Section>
  );
};

export default HorizontalListContainer;