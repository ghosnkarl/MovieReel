import { useInfiniteQuery } from '@tanstack/react-query';
import PersonItem from '../../components/list_items/person_item/PersonItem';
import { IPeople } from '../../models/peopleModel';
import { fetchResults } from '../../services/http';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';

export default function PeoplePage() {
  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['popular', 'person'],
    queryFn: ({ pageParam = 1 }) =>
      fetchResults<IPeople>({
        path: 'person/popular',
        params: null,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  const allPeople = data.pages
    .flatMap((page) => page.results)
    .filter(
      (media, index, self) => self.findIndex((m) => m.id === media.id) === index
    );

  return (
    <div>
      <ul className='grid--6-cols'>
        {data &&
          allPeople.map((person) => (
            <PersonItem
              key={person.id}
              profile_path={person.profile_path}
              title={person.name}
              text={null}
              id={person.id}
            />
          ))}
      </ul>

      <div
        style={{
          alignSelf: 'center',
          justifySelf: 'center',
          marginTop: '1.2rem',
        }}
        ref={ref}
      >
        {isFetchingNextPage && <LoadingIndicator />}
      </div>
    </div>
  );
}
