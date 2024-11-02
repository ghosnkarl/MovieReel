import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ListArrows = ({ listRef }: { listRef: HTMLUListElement | null }) => {
  const handleNext = () => {
    if (listRef) listRef.scrollLeft += listRef.clientWidth;
  };

  const handleLeft = () => {
    if (listRef) listRef.scrollLeft -= listRef.clientWidth;
  };

  return (
    <div className='list-arrows__container'>
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
