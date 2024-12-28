import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SEARCH_OPTIONS } from '@/data/searchOptions';
import Dropdown, { ItemProps } from '@/components/dropdown/Dropdown';
import classes from '@/components/searchbar/SearchBarHeader.module.css';
import SearchList, {
  ISearchItem,
} from '@/components/lists/searchList/SearchList';
import { MdOutlineClear } from 'react-icons/md';
import EmptyResource from '@/components/ui/emptyResource/EmptyResource';
import useSearch from '@/hooks/useSearch';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';

const SearchBarHeader = ({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen?: (value: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchType, setSearchType] = useState<ItemProps>(SEARCH_OPTIONS[0]);
  const lastChange = useRef<ReturnType<typeof setInterval> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchQuery = useSearch({
    value: searchType.value,
    query: searchTerm,
  });

  const clearInput = () => {
    if (inputRef && inputRef.current) inputRef.current.value = '';
    setSearchTerm('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(e.target.value);
      setOpen(e.target.value !== '');
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const handler = ({ target }: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);
  return (
    <>
      <Dropdown
        selectedSortItem={searchType}
        setSelectedSortItem={setSearchType}
        items={SEARCH_OPTIONS}
      />
      <input
        ref={inputRef}
        className={classes.search}
        type='text'
        placeholder='Search Movie Reel'
        onChange={handleChange}
      />
      {(isLoading || !searchQuery.data) && (
        <LoadingSpinner variant='progress' />
      )}
      {!isLoading && searchQuery.data && searchTerm.length > 0 && (
        <MdOutlineClear onClick={clearInput} className={classes.clear} />
      )}
      <div
        ref={dropdownRef}
        className={`${classes.dropdownContent} ${
          open ? classes.contentOpen : ''
        }`}
      >
        {searchQuery.data && searchQuery.data.results.length > 0 && (
          <SearchList
            setMobileMenuOpen={setMobileMenuOpen}
            setOpen={setOpen}
            clearInput={clearInput}
            data={searchQuery.data.results.map((item) => {
              const image =
                'poster_path' in item
                  ? item.poster_path
                  : 'profile_path' in item
                  ? item.profile_path
                  : null;

              const title = 'title' in item ? item.title : item.name;
              const date =
                'release_date' in item
                  ? item.release_date
                  : 'first_air_date' in item
                  ? item.first_air_date
                  : null;
              return {
                id: item.id,
                image,
                title,
                date,
                type: searchType.value,
              } as ISearchItem;
            })}
          />
        )}

        {searchQuery.data && searchQuery.data.results.length === 0 && (
          <EmptyResource
            title='No Results Found'
            description='No matches found. Please refine your search or check for errors.'
          />
        )}
      </div>
    </>
  );
};

export default SearchBarHeader;
