import { UseQueryResult } from '@tanstack/react-query';
import HorizontalList from './HorizontalList';
import LoadingIndicator from '../ui/LoadingIndicator';
import ErrorBlock from '../ui/error_block/ErrorBlock';
import { IMovie, ITVShow } from '../../models/mediaModel';
import { IPeople } from '../../models/peopleModel';

export type QueryData = IMovie[] | ITVShow[] | IPeople[];
export type DataType = 'movie' | 'tvShows' | 'people';

interface IHorizontalWrapper {
  query: UseQueryResult<QueryData, Error>;
  title: string;
  link: string;
  type: DataType;
}

const HorizontalWrapper = ({
  query,
  title,
  link,
  type,
}: IHorizontalWrapper) => {
  const { data, isError, isLoading, refetch } = query;
  if (isLoading) return <LoadingIndicator />;

  if (isError || !data)
    return (
      <ErrorBlock
        message={`There was an error fetching ${title.toLocaleLowerCase()}`}
        onTryAgainClick={refetch}
      />
    );

  return (
    <HorizontalList
      link={link}
      linkState={null}
      title={title}
      type={type}
      data={data}
    />
  );
};

export default HorizontalWrapper;
