import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import classes from './list-arrows.module.css';

const ListArrows = ({ listRef }: { listRef: HTMLUListElement | null }) => {
  const handleNext = () => {
    if (listRef) listRef.scrollLeft += listRef.clientWidth;
  };

  const handleLeft = () => {
    if (listRef) listRef.scrollLeft -= listRef.clientWidth;
  };

  return (
    <div className={classes.container}>
      <button className={classes['btn-arrow']} onClick={handleLeft}>
        <MdNavigateBefore />
      </button>
      <button className={classes['btn-arrow']} onClick={handleNext}>
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default ListArrows;
