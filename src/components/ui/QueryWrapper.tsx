import { UseQueryResult } from '@tanstack/react-query';
import ErrorBlock from './error_block/ErrorBlock';
import LoadingIndicator from './loading_indicator/LoadingIndicator';

interface QueryWrapperProps {
  children: JSX.Element | JSX.Element[];
  query: UseQueryResult<unknown, Error>;
  message: string;
}

const QueryWrapper = ({ children, query, message }: QueryWrapperProps) => {
  let content = <></>;
  if (query.isLoading)
    content = <LoadingIndicator title={`Fetching ${message}...`} />;
  if (query.isError) {
    content = (
      <ErrorBlock
        message={`There was an error fetching ${message.toLocaleLowerCase()}`}
        onTryAgainClick={query.refetch}
      />
    );
  }

  if (query.data) {
    content = <>{children}</>;
  }
  return <div>{content}</div>;
};

export default QueryWrapper;
