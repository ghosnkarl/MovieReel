import PersonItem from '@/components/personItem/PersonItem';
import ErrorPage from '@/pages/errorPage/ErrorPage';
import InfiniteLoader from '@/components/infiniteLoader/InfiniteLoader';
import useInfinitePeopleQuery from '@/hooks/useInfinitePeopleQuery';
import LoadingIndicator from '@/components/ui/loadingSpinner/LoadingIndicator';

export default function PeoplePage() {
  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinitePeopleQuery();

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  const allPeople = data.pages
    .flatMap((page) => page.results)
    .filter(
      (media, index, self) => self.findIndex((m) => m.id === media.id) === index
    );

  return (
    <div>
      <InfiniteLoader
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
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
      </InfiniteLoader>
    </div>
  );
}
