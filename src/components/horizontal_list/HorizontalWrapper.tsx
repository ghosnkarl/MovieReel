import { UseQueryResult } from '@tanstack/react-query';

import HorizontalList from './HorizontalList';
import LoadingIndicator from '../ui/LoadingIndicator';
import ErrorBlock from '../ui/error_block/ErrorBlock';

interface IHorizontalWrapper {
  query: UseQueryResult<unknown, Error>;
  title: string;
  link: string;
  children: React.ReactNode;
}

const HorizontalWrapper = ({
  query,
  title,
  link,
  children,
}: IHorizontalWrapper) => {
  if (query.isLoading) return <LoadingIndicator />;

  if (query.isError)
    return (
      <ErrorBlock
        message={`There was an error fetching ${title.toLocaleLowerCase()}`}
        onTryAgainClick={query.refetch}
      />
    );
  return (
    <HorizontalList link={link} title={title} linkState={null}>
      {children}
    </HorizontalList>
  );
};

export default HorizontalWrapper;
