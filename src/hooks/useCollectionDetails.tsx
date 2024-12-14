import { useQuery } from '@tanstack/react-query';
import { ICollectionDetails } from '../models/commonModel';
import { fetchSingleResult } from '../services/http';

const useCollectionDetails = ({
  collectionId,
}: {
  collectionId: number | null;
}) =>
  useQuery<ICollectionDetails>({
    queryKey: ['collection', collectionId],
    queryFn: () =>
      fetchSingleResult<ICollectionDetails>({
        path: `collection/${collectionId}`,
        params: null,
      }),
    retry: 1,
    enabled: Boolean(collectionId),
  });

export default useCollectionDetails;
