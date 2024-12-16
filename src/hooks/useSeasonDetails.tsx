import { useQuery } from '@tanstack/react-query';
import { fetchSingleResult } from '../services/http';
import { ISeason } from '../models/seasonModel';

interface IUseSeasonDetails {
  tvId: string;
  seasonNumber: string;
}

const useSeasonDetails = ({ tvId, seasonNumber }: IUseSeasonDetails) =>
  useQuery({
    queryKey: ['season', seasonNumber],
    queryFn: () =>
      fetchSingleResult<ISeason>({
        path: `tv/${tvId}/season/${seasonNumber}`,
        params: null,
      }),
    retry: 1,
  });

export default useSeasonDetails;
