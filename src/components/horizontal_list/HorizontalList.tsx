import { useEffect, useRef, useState } from 'react';
import ListArrows from './ListArrows';
import HeaderLink from '../ui/HeaderLink';
import classes from './HorizontalList.module.css';

interface IHorizontalList {
  title: string;
  children: React.ReactNode;
  linkState: unknown;
  link: string | null;
}

const HorizontalList = ({
  title,
  linkState,
  children,
  link,
}: IHorizontalList) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);

  return (
    <div>
      <div className={classes.header}>
        {!link ? (
          <h1 className={classes.title}>{title}</h1>
        ) : (
          <HeaderLink link={link} linkState={linkState} title={title} />
        )}

        <ListArrows listRef={ref} />
      </div>

      <ul ref={listRef} className={classes['list__container']}>
        {children}
      </ul>
    </div>
  );
};

export default HorizontalList;
