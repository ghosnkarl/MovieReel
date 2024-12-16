import { useQuery } from '@tanstack/react-query';
import { fetchSingleResult } from '../services/http';
import { IPerson } from '../models/peopleModel';

const usePersonDetails = ({ personId }: { personId: string | undefined }) => {
  const queryParams = {
    append_to_response: 'images,combined_credits',
    include_image_language: 'en,null',
  };
  return useQuery({
    queryKey: ['people', personId],
    queryFn: () =>
      fetchSingleResult<IPerson>({
        path: `person/${personId}`,
        params: queryParams,
      }),
    retry: 1,
  });
};
export default usePersonDetails;
