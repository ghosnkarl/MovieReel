import { UseQueryResult } from '@tanstack/react-query';
import QueryWrapper from './QueryWrapper';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';

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
      <HorizontalListContainer link={link} title={title} linkState={null}>
        {children}
      </HorizontalListContainer>
    </QueryWrapper>
  );
};

export default HorizontalWrapper;
