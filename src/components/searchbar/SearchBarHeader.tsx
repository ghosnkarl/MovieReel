import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SEARCH_OPTIONS } from '../../data/searchOptions';
import Dropdown, { ItemProps } from '../dropdown/Dropdown';
import classes from './SearchBarHeader.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../../services/http';
import { IMedia } from '../../models/mediaModel';
import { IIdName } from '../../models/commonModel';
import { IPerson } from '../../models/peopleModel';
import { CircularProgress } from '@mui/material';
import SearchList, { ISearchItem } from '../lists/search_list/SearchList';

const SearchBarHeader = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchType, setSearchType] = useState<ItemProps>(SEARCH_OPTIONS[0]);
  const lastChange = useRef<ReturnType<typeof setInterval> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchQuery = useQuery({
    queryKey: [searchType.value, { search: searchTerm }],
    queryFn: () =>
      fetchResults<IMedia | IIdName | IPerson>({
        path: `search/${searchType.value}`,
        params: { query: searchTerm },
      }),
    retry: 1,
  });

  const clearInput = () => {
    if (inputRef && inputRef.current) inputRef.current.value = '';
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
    <div className={classes['search__container']}>
      <Dropdown
        selectedSortItem={searchType}
        setSelectedSortItem={setSearchType}
        items={SEARCH_OPTIONS}
      />
      <input
        ref={inputRef}
        className={classes.search}
        type='text'
        placeholder='Search for movies, tv shows, people and other...'
        onChange={handleChange}
      />
      {(isLoading || !searchQuery.data) && (
        <CircularProgress
          sx={{
            color: '#f97316',
            justifySelf: 'center',
            alignSelf: 'center',
            marginRight: '1.6rem',
          }}
          size={22}
        />
      )}
      <div
        ref={dropdownRef}
        className={`${classes['dropdown-content']} ${
          open ? classes['content-open'] : ''
        }`}
      >
        {searchQuery.data && searchQuery.data.length > 0 && (
          <SearchList
            setOpen={setOpen}
            clearInput={clearInput}
            data={searchQuery.data.map((item) => {
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
      </div>
    </div>
  );
};

export default SearchBarHeader;