import { UseQueryResult } from '@tanstack/react-query';
import HorizontalList from './HorizontalList';
import LoadingIndicator from '../ui/LoadingIndicator';
import { IMedia } from '../../models/mediaModel';
import { IPeople } from '../../models/peopleModel';
import { MediaType } from '../../helpers/constants';
import ErrorComponent from '../ui/error_component/ErrorComponent';

export type QueryData = IMedia[] | IPeople[];
export type DataType = MediaType | 'person';

interface IHorizontalWrapper {
  query: UseQueryResult<QueryData, Error>;
  title: string;
  link: string | null;
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

  if (isError || !data) return <ErrorComponent onRetry={refetch} />;

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
