import { UseQueryResult } from '@tanstack/react-query';
import HorizontalList from './HorizontalList';
import { IMedia } from '../../models/mediaModel';
import { IPeople } from '../../models/peopleModel';
import { MediaType } from '../../helpers/constants';
import ErrorComponent from '../ui/errorComponent/ErrorComponent';
import { ISeason } from '../../models/seasonModel';
import { IResultsProps } from '../../services/http';
import LoadingIndicator from '../ui/loadingSpinner/LoadingIndicator';

export type QueryData = IMedia | IPeople | ISeason;
export type DataType = MediaType | 'season';

interface HorizontalWrapperProps {
  query: UseQueryResult<IResultsProps<QueryData>, Error>;
  title: string;
  link: string | null;
  type: DataType;
}

const HorizontalWrapper = ({
  query,
  title,
  link,
  type,
}: HorizontalWrapperProps) => {
  const { data, isError, isLoading, refetch } = query;
  if (isLoading) return <LoadingIndicator />;

  if (isError || !data) return <ErrorComponent onRetry={refetch} />;

  return (
    <HorizontalList
      link={link}
      linkState={null}
      title={title}
      type={type}
      data={data.results}
    />
  );
};

export default HorizontalWrapper;
