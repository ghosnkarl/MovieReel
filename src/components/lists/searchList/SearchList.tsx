import classes from '@/components/lists/searchList/SearchList.module.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { tmdbImage } from '@/helpers/imageSizes';
import { format } from '@/helpers/format';
import { MediaType } from '@/helpers/constants';

export interface ISearchItem {
  id: number;
  image: string | null;
  type: MediaType | 'keyword' | 'company';
  title: string;
  date: string | null;
}

interface SearchItemProps extends ISearchItem {
  isFocused: boolean;
  onClick: () => void;
  itemRef: (el: HTMLDivElement | null) => void;
}

const SearchItem = ({
  image,
  type,
  title,
  date,
  isFocused,
  onClick,
  itemRef,
}: SearchItemProps) => {
  const poster =
    type === 'person'
      ? tmdbImage.profile(image, 'w185')
      : type === 'movie' || type === 'tv'
      ? tmdbImage.poster(image, 'w342')
      : null;
  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`${classes.item} ${isFocused ? classes.focused : ''}`}
      tabIndex={-1}
    >
      {poster && <img className={classes.poster} src={poster} alt={title} />}
      <div className={classes.textContainer}>
        <h1 className={classes.title}>{title}</h1>
        {date && <p className={classes.text}>{format.year(date)}</p>}
      </div>
    </div>
  );
};

interface SearchListProps {
  data: ISearchItem[];
  setOpen: (dropdownOpen: boolean) => void;
  clearInput: () => void;
  setMobileMenuOpen?: (value: boolean) => void;
}

const SearchList = ({
  data,
  setOpen,
  clearInput,
  setMobileMenuOpen,
}: SearchListProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSearchClicked = useCallback(
    (item: ISearchItem) => {
      navigate(`/${item.type}/${item.id}`);
      clearInput();
      if (setMobileMenuOpen) setMobileMenuOpen(false);
      setOpen(false);
    },
    [navigate, clearInput, setOpen]
  );

  const navigateFocus = (direction: 'up' | 'down') => {
    setFocusedIndex((prev) =>
      direction === 'down'
        ? (prev + 1) % data.length
        : (prev - 1 + data.length) % data.length
    );
    listRef.current?.focus();
  };

  const handleGlobalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!data.length) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          navigateFocus('down');
          break;
        case 'ArrowUp':
          e.preventDefault();
          navigateFocus('up');
          break;
        case 'Enter':
          if (focusedIndex >= 0) handleSearchClicked(data[focusedIndex]);
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    },
    [data, focusedIndex, handleSearchClicked, setOpen]
  );

  // Auto-focus logic
  useEffect(() => setFocusedIndex(0), [data]);

  useEffect(() => {
    itemRefs.current[focusedIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [focusedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  return (
    <ul ref={listRef} className={classes.list} tabIndex={-1}>
      {data.map((item, index) => (
        <SearchItem
          key={item.id}
          {...item}
          isFocused={index === focusedIndex}
          onClick={() => handleSearchClicked(item)}
          itemRef={(el: HTMLDivElement | null) =>
            (itemRefs.current[index] = el)
          }
        />
      ))}
    </ul>
  );
};

export default SearchList;
