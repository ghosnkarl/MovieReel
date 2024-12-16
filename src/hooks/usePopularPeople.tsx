import { useQuery } from '@tanstack/react-query';
import { IPeople } from '../models/peopleModel';
import { fetchResults } from '../services/http';

const usePopularPeople = () =>
  useQuery({
    queryKey: ['popular', 'person'],
    queryFn: () =>
      fetchResults<IPeople>({ path: 'person/popular', params: null }),
    retry: 1,
  });

export default usePopularPeople;
