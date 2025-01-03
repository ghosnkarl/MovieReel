import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../services/http';
import { IMedia } from '../models/mediaModel';
import { IBaseIdName } from '../models/commonModel';
import { IPerson } from '../models/peopleModel';

interface ISearchType {
  value: string;
  query: string;
}

const useSearch = ({ value, query }: ISearchType) =>
  useQuery({
    queryKey: [value, { search: query }],

    queryFn: () =>
      fetchResults<IMedia | IBaseIdName | IPerson>({
        path: `search/${value}`,
        params: { query },
      }),
    retry: 1,
  });

export default useSearch;
