import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

interface IListArrows {
  listRef: HTMLUListElement | null;
  link: string | null;
  linkState: unknown;
}

const ListArrows = ({ listRef, link, linkState }: IListArrows) => {
  const handleNext = () => {
    if (listRef) listRef.scrollLeft += listRef.clientWidth;
  };

  const handleLeft = () => {
    if (listRef) listRef.scrollLeft -= listRef.clientWidth;
  };

  return (
    <div className='list-arrows__container'>
      {link && (
        <NavLink state={linkState} className='view--all' to={link}>
          View All
        </NavLink>
      )}
      <button className='btn-arrow' onClick={handleLeft}>
        <MdNavigateBefore />
      </button>
      <button className='btn-arrow' onClick={handleNext}>
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default ListArrows;
