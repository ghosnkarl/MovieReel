import { ChangeEvent, useRef, useState } from 'react';
import { ItemProps } from '../../components/dropdown/Dropdown';
import { SEARCH_OPTIONS } from '../../data/searchOptions';
import classes from './SearchPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../../services/http';
import MediaList from '../../components/lists/media_list/MediaList';
import { MdSearch } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import { IPerson } from '../../models/peopleModel';
import PersonItem from '../../components/list_items/person_item/PersonItem';
import { IIdName } from '../../models/commonModel';
import { IMedia } from '../../models/mediaModel';

const SearchPage = () => {
  const [searchType, setSearchType] = useState<ItemProps>(SEARCH_OPTIONS[0]);
  const lastChange = useRef<ReturnType<typeof setInterval> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchQuery = useQuery({
    queryKey: [searchType.value, { search: searchTerm }],
    queryFn: () =>
      fetchResults({
        path: `search/${searchType.value}`,
        params: { query: searchTerm },
      }),
    retry: 1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(e.target.value);
      setIsLoading(false);
    }, 500);
  };

  const handleTypeClicked = (type: (typeof SEARCH_OPTIONS)[0]) => {
    setSearchType(type);
  };

  return (
    <div className='page-container'>
      <div className={classes['header__container']}>
        <div className={classes['search__container']}>
          {isLoading || !searchQuery.data ? (
            <CircularProgress
              sx={{
                color: '#f97316',
                justifySelf: 'center',
                alignSelf: 'center',
              }}
              size={22}
            />
          ) : (
            <MdSearch className={classes['search__icon']} />
          )}

          <input
            className={classes.search}
            type='text'
            placeholder='Search for movies, tv shows, people and other...'
            onChange={handleChange}
          />
        </div>
        <ul className={classes.types}>
          {SEARCH_OPTIONS.map((option) => (
            <li
              className={`${classes.type} ${
                searchType === option ? classes.active : ''
              }`}
              key={option.output}
              onClick={() => handleTypeClicked(option)}
            >
              {option.output}
            </li>
          ))}
        </ul>
      </div>
      {searchQuery.data && searchQuery.data?.length > 0 && (
        <div>
          {(searchType.value === 'movie' || searchType.value === 'tv') && (
            <ul className='grid--5-cols'>
              <MediaList
                data={searchQuery.data as IMedia[]}
                type={searchType.value}
              />
            </ul>
          )}
          {searchType.value === 'person' && (
            <ul className='grid--7-cols'>
              {(searchQuery.data as IPerson[]).map((person) => (
                <PersonItem
                  key={person.id}
                  id={person.id}
                  profile_path={person.profile_path}
                  title={person.name}
                  text={person.known_for_department}
                />
              ))}
            </ul>
          )}

          {(searchType.value === 'keyword' ||
            searchType.value === 'company') && (
            <ul className='flex--wrap'>
              {(searchQuery.data as IIdName[]).map((item) => (
                <li className={classes.name} key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {searchTerm !== '' && searchQuery.data?.length === 0 && (
        <h1>No Results</h1>
      )}
    </div>
  );
};

export default SearchPage;
