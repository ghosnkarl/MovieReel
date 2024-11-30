import { UseQueryResult } from '@tanstack/react-query';
import QueryWrapper from '../ui/QueryWrapper';
import HorizontalList from './HorizontalList';

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
  return (
    <QueryWrapper message={title} query={query}>
      <HorizontalList link={link} title={title} linkState={null}>
        {children}
      </HorizontalList>
    </QueryWrapper>
  );
};

export default HorizontalWrapper;
